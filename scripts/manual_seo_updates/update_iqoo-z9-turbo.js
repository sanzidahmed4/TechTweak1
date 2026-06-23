const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  // WARNING: MUST USE EXACT LOWERCASE SLUG HERE
  const result = await Phone.updateOne({ slug: 'iqoo-z9-turbo' }, { $set: {
    seo_overview: `The iQOO Z9 Turbo is a budget-friendly powerhouse that delivers an impressive combination of performance and endurance at just $280. At its heart lies the Qualcomm Snapdragon 8s Gen 3, a capable 4nm chipset that brings near-flagship processing power to the mid-range segment. Whether you're gaming, streaming, or juggling multiple apps, the Z9 Turbo handles it all with ease.

The 6.78-inch display dominates the front of the device with an approximately 89.2% screen-to-body ratio, providing an immersive canvas for content consumption and gaming. The camera system pairs a 50 MP primary sensor with OIS and PDAF for reliable photo quality, while the 8 MP ultrawide lens adds versatility for landscape and group shots. The f/1.8 aperture ensures decent low-light performance for a phone at this price point.

Where the iQOO Z9 Turbo truly shines is its massive 6000 mAh battery — one of the largest in its class. This ensures exceptional battery life that can comfortably last well beyond a full day of heavy usage. The IP64 dust and water resistance adds a layer of protection for everyday use. While it lacks wireless charging and a headphone jack, the Z9 Turbo compensates with raw value. For USA buyers seeking a reliable daily driver with outstanding battery life and solid performance, the iQOO Z9 Turbo is a compelling option that's hard to beat at its price.`,
    verdict: `The iQOO Z9 Turbo is a standout choice for budget-conscious USA buyers who refuse to compromise on performance or battery life. The Snapdragon 8s Gen 3 chipset delivers smooth, responsive performance that outclasses most competitors at this price, and the 6000 mAh battery is a genuine game-changer for power users. The 50 MP OIS camera takes solid photos for everyday use. The lack of wireless charging and a headphone jack may disappoint some users, but at $280, the overall package is exceptional. If all-day battery endurance and strong processing power are your priorities, the Z9 Turbo deserves serious consideration.`,
    pros: [
      "Massive 6000 mAh battery for exceptional multi-day endurance",
      "Snapdragon 8s Gen 3 chipset delivers near-flagship performance",
      "50 MP primary camera with OIS for stable, clear photography",
      "IP64 dust and water resistance at a budget price"
    ],
    cons: [
      "No wireless charging support",
      "No headphone jack for wired audio",
      "8 MP ultrawide camera is limited compared to higher-end options"
    ],
    faqs: [
      { question: "How long does the iQOO Z9 Turbo battery last?", answer: "The iQOO Z9 Turbo packs a massive 6000 mAh battery, one of the largest in the mid-range segment. Under typical usage, it can easily last a full day and often stretches into a second day, making it ideal for power users and travelers." },
      { question: "What processor does the iQOO Z9 Turbo use?", answer: "The iQOO Z9 Turbo is powered by the Qualcomm Snapdragon 8s Gen 3, a 4nm chipset that delivers near-flagship-level performance. It handles demanding games, multitasking, and everyday tasks with ease." },
      { question: "Is the iQOO Z9 Turbo water resistant?", answer: "Yes, the iQOO Z9 Turbo has an IP64 rating, which means it is protected against dust ingress and water splashes from all directions. However, it is not designed for submersion in water." },
      { question: "Does the iQOO Z9 Turbo have a good camera?", answer: "The iQOO Z9 Turbo features a 50 MP primary camera with OIS and PDAF, which captures detailed and stable photos in most lighting conditions. It also includes an 8 MP ultrawide lens for wider shots, though it's less detailed than the main sensor." },
      { question: "How much does the iQOO Z9 Turbo cost in the USA?", answer: "The iQOO Z9 Turbo is priced at approximately $280 in the USA, making it one of the best value-for-money smartphones with a Snapdragon 8s Gen 3 processor and a 6000 mAh battery." }
    ],
    meta_title: "iQOO Z9 Turbo Price in USA & Full Specs | Buy or Skip?",
    meta_description: "iQOO Z9 Turbo costs $280 in the USA. Snapdragon 8s Gen 3, 6000 mAh battery, 50 MP OIS camera. Read full specs, pros & cons, and verdict.",
    manual_seo_done: true
  }});

  console.log(`Updated iqoo-z9-turbo, modified: ${result.modifiedCount}`);
  await mongoose.disconnect();
}
run().catch(console.error);
