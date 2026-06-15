const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function restoreRedmi18() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  const Brand = mongoose.model('Brand', new mongoose.Schema({}, { strict: false }));

  const xiaomi = await Brand.findOne({ slug: 'xiaomi' });

  await Phone.updateOne(
    { slug: 'redmi-18-pro' },
    {
      $set: {
        name: 'Redmi 18 Pro',
        slug: 'redmi-18-pro',
        brand_id: xiaomi._id,
        phone_status: 'upcoming',
        is_official: false,
        expected_launch_date: '2026, Q4',
        release_date: '',
        price_usd: null,
        price_display_text: 'Not Announced Yet',
        display_price: 'Not Announced Yet',
        is_published: true,
        seo_overview: 'The Redmi 18 Pro is an upcoming mid-range flagship smartphone from Xiaomi, expected to feature incredible performance and a stunning camera system at a highly competitive price.',
        verdict: 'Stay tuned for more updates. The Redmi 18 Pro is poised to be one of the best value-for-money smartphones.',
        faqs: []
      }
    },
    { upsert: true }
  );

  console.log('Successfully restored Redmi 18 Pro!');
  await mongoose.disconnect();
}

restoreRedmi18().catch(console.error);
