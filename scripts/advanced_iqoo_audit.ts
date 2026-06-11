import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Adjust path as needed based on execution directory
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Basic Phone Schema representation
const phoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema);
const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({}, { strict: false }));

async function checkImageUrl(url: string): Promise<boolean> {
  if (!url || typeof url !== 'string' || !url.startsWith('http')) return false;
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    return res.ok;
  } catch (err) {
    return false;
  }
}

async function runAudit() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const iqooBrand = await Brand.findOne({ slug: 'iqoo' }).lean() as any;
  if (!iqooBrand) {
    console.error('iQOO brand not found');
    process.exit(1);
  }

  const phones = await Phone.find({ brand_id: iqooBrand._id }).lean() as any[];
  console.log(`Found ${phones.length} iQOO phones. Starting audit...\n`);

  const report = {
    releasedPhones: [] as string[],
    upcomingPhones: [] as string[],
    imageErrors: [] as { phone: string, url: string }[],
    contentQuality: [] as { phone: string, issues: string[] }[],
    missingSeo: [] as { phone: string, missing: string[] }[]
  };

  for (const phone of phones) {
    // 1. Separation
    if (phone.upcoming) {
      report.upcomingPhones.push(phone.name);
    } else {
      report.releasedPhones.push(phone.name);
    }

    // 2. Image Verification
    const images = Array.isArray(phone.images) ? phone.images : [];
    if (images.length === 0) {
      report.imageErrors.push({ phone: phone.name, url: 'NO IMAGES DEFINED' });
    } else {
      for (const url of images) {
        const isValid = await checkImageUrl(url);
        if (!isValid) {
          report.imageErrors.push({ phone: phone.name, url });
        }
      }
    }

    // Check OG Image too
    if (phone.og_image) {
       const isOgValid = await checkImageUrl(phone.og_image);
       if (!isOgValid) {
         report.imageErrors.push({ phone: phone.name, url: `[OG] ${phone.og_image}` });
       }
    }

    // 3. Content Length & Quality
    const qualityIssues: string[] = [];
    
    // Using string checks
    const hasPros = Array.isArray(phone.pros) && phone.pros.length > 0;
    const hasCons = Array.isArray(phone.cons) && phone.cons.length > 0;
    const hasFaqs = Array.isArray(phone.faqs) && phone.faqs.length > 0;

    if (!hasPros) qualityIssues.push('Missing Pros');
    if (!hasCons) qualityIssues.push('Missing Cons');
    if (!hasFaqs) qualityIssues.push('Missing FAQs');
    
    // Let's assume we want to check overview and verdict if they were added (currently we only generated meta_description and faqs/pros/cons during import)
    if (!phone.seo_overview || phone.seo_overview.length < 50) qualityIssues.push('Missing or too short SEO Overview');
    if (!phone.verdict || phone.verdict.length < 50) qualityIssues.push('Missing or too short Verdict');

    if (qualityIssues.length > 0) {
      report.contentQuality.push({ phone: phone.name, issues: qualityIssues });
    }

    // 4. Missing SEO Opportunities
    const seoMissing: string[] = [];
    if (!phone.meta_title) seoMissing.push('meta_title');
    if (!phone.meta_description) seoMissing.push('meta_description');
    if (!phone.og_image) seoMissing.push('og_image');
    if (!phone.primary_keyword) seoMissing.push('primary_keyword');
    
    // Check if meta description is too short (under 120 chars is not ideal for SEO, but under 50 is definitely bad)
    if (phone.meta_description && phone.meta_description.length < 100) {
        seoMissing.push('meta_description is too short (< 100 chars)');
    }

    if (seoMissing.length > 0) {
      report.missingSeo.push({ phone: phone.name, missing: seoMissing });
    }
    
    // progress
    process.stdout.write('.');
  }
  
  console.log('\n\n--- AUDIT COMPLETE ---\n');

  // Print results to console as JSON so the agent can parse and format them into a markdown artifact
  console.log('JSON_START');
  console.log(JSON.stringify(report, null, 2));
  console.log('JSON_END');

  await mongoose.disconnect();
}

runAudit().catch(console.error);
