import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

async function runAudit() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    const db = mongoose.connection.db;
    const Phone = db.collection('phones');
    const Brand = db.collection('brands');

    const samsungBrand = await Brand.findOne({ name: /Samsung/i });
    if (!samsungBrand) {
      console.log("Samsung brand not found.");
      return;
    }

    const phones = await Phone.find({ brand_id: samsungBrand._id }).toArray();
    console.log(`Total Samsung Phones: ${phones.length}`);

    let audit = {
      missing_specs: 0,
      missing_tiers: 0,
      missing_internal_links: 0,
      upcoming_metadata_errors: 0,
      seo_overview_short: 0,
      seo_verdict_short: 0,
      seo_faqs_under_5: 0,
      seo_meta_desc_length: 0,
      specific_gaps: {} as any
    };

    const mandatorySpecs = [
      'processor', 'display_type', 'cam_main_sensor', 'battery_capacity', 'charging_wired'
    ];
    // Secondary specs that might be missing since they weren't explicitly added in my scripts:
    const strictSpecs = [
      'gpu', 'refresh_rate', 'brightness', 'video_recording', 'wireless_charging', 'weight', 'dimensions'
    ];

    phones.forEach(p => {
      let missingSpecsList: string[] = [];
      
      mandatorySpecs.forEach(spec => {
        if (!p[spec]) missingSpecsList.push(spec);
      });
      strictSpecs.forEach(spec => {
        if (!p[spec]) missingSpecsList.push(spec);
      });

      if (missingSpecsList.length > 0) {
        audit.missing_specs++;
        audit.specific_gaps[p.name] = audit.specific_gaps[p.name] || {};
        audit.specific_gaps[p.name].missing_specs = missingSpecsList;
      }

      if (!p.price_segment || !p.performance_tier || !p.camera_tier || !p.battery_tier) {
        audit.missing_tiers++;
      }

      if (!p.internal_links || !p.internal_links.same_brand) {
        audit.missing_internal_links++;
      }

      if (p.phone_status === 'upcoming') {
        if (p.is_official !== false || !p.expected_launch_date || !p.launch_year || !p.launch_quarter || !p.leak_confidence) {
          audit.upcoming_metadata_errors++;
        }
      }

      const overviewWords = p.overview ? p.overview.split(' ').length : 0;
      if (overviewWords < 150) audit.seo_overview_short++;

      const verdictWords = p.verdict ? p.verdict.split(' ').length : 0;
      if (verdictWords < 80) audit.seo_verdict_short++;

      const faqCount = p.faq_schema ? p.faq_schema.length : 0;
      if (faqCount < 5) audit.seo_faqs_under_5++;

      const metaLen = p.meta_description ? p.meta_description.length : 0;
      if (metaLen < 140 || metaLen > 160) audit.seo_meta_desc_length++;
    });

    console.log("\n=== AUDIT RESULTS ===");
    console.log(`Phones with missing/incomplete hardware specs (gpu, refresh_rate, dimensions, etc): ${audit.missing_specs}`);
    console.log(`Phones missing comparison tiers: ${audit.missing_tiers}`);
    console.log(`Phones missing internal linking: ${audit.missing_internal_links}`);
    console.log(`Upcoming phones missing mandatory upcoming fields: ${audit.upcoming_metadata_errors}`);
    console.log(`Phones with Overview < 150 words: ${audit.seo_overview_short}`);
    console.log(`Phones with Verdict < 80 words: ${audit.seo_verdict_short}`);
    console.log(`Phones with < 5 FAQs: ${audit.seo_faqs_under_5}`);
    console.log(`Phones with invalid Meta Description length (not 140-160 chars): ${audit.seo_meta_desc_length}`);
    
    // Sample a few gaps
    console.log("\nSample of missing specs:");
    const sampleKeys = Object.keys(audit.specific_gaps).slice(0, 5);
    sampleKeys.forEach(k => {
      console.log(`- ${k}: ${audit.specific_gaps[k].missing_specs.join(', ')}`);
    });

  } catch (err) {
    console.error("Audit failed:", err);
  } finally {
    await mongoose.disconnect();
  }
}

runAudit();
