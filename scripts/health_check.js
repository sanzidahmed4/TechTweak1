const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function healthCheck() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  const Brand = mongoose.model('Brand', new mongoose.Schema({}, { strict: false }));

  const total = await Phone.countDocuments();
  const noSlug = await Phone.countDocuments({ $or: [{ slug: null }, { slug: '' }] });
  const noBrand = await Phone.countDocuments({ brand_id: null });
  const noName = await Phone.countDocuments({ $or: [{ name: null }, { name: '' }] });
  const noStatus = await Phone.countDocuments({ $or: [{ phone_status: null }, { phone_status: '' }] });
  const noSeoOverview = await Phone.countDocuments({ $or: [{ seo_overview: null }, { seo_overview: '' }] });
  const noImage = await Phone.countDocuments({ $or: [{ image: null }, { image: '' }, { image_url: null }, { image_url: '' }] });

  console.log('=== DATABASE HEALTH REPORT ===');
  console.log(`Total phones:         ${total}`);
  console.log(`Missing slug:         ${noSlug}   ${noSlug > 0 ? '⚠️ PROBLEM' : '✅'}`);
  console.log(`Missing brand_id:     ${noBrand}  ${noBrand > 0 ? '⚠️ PROBLEM' : '✅'}`);
  console.log(`Missing name:         ${noName}   ${noName > 0 ? '⚠️ PROBLEM' : '✅'}`);
  console.log(`Missing phone_status: ${noStatus} ${noStatus > 0 ? '⚠️ PROBLEM' : '✅'}`);
  console.log(`Missing seo_overview: ${noSeoOverview} ${noSeoOverview > 0 ? '⚠️ PROBLEM' : '✅'}`);
  console.log(`Missing image:        ${noImage} ${noImage > 0 ? '⚠️ PROBLEM' : '✅'}`);

  // Check all brands exist
  const allBrandIds = await Phone.distinct('brand_id');
  const brands = await Brand.find({ _id: { $in: allBrandIds } }, { name: 1, slug: 1 });
  console.log(`\nTotal distinct brands in phones: ${allBrandIds.length}`);
  console.log(`Brands found in DB:              ${brands.length}`);
  if (allBrandIds.length !== brands.length) {
    console.log('⚠️ Some phones have brand_id pointing to a non-existent brand!');
  } else {
    console.log('✅ All brand references are valid.');
  }

  // List phones with no slug
  if (noSlug > 0) {
    const missing = await Phone.find({ $or: [{ slug: null }, { slug: '' }] }, { name: 1 });
    console.log('\nPhones with missing slug:');
    missing.forEach(p => console.log(`  - ${p.name}`));
  }

  // List phones with no brand
  if (noBrand > 0) {
    const missing = await Phone.find({ brand_id: null }, { name: 1 });
    console.log('\nPhones with missing brand_id:');
    missing.forEach(p => console.log(`  - ${p.name}`));
  }

  await mongoose.disconnect();
}

healthCheck().catch(console.error);
