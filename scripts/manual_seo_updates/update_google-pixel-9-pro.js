const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  // WARNING: MUST USE EXACT LOWERCASE SLUG HERE
  const result = await Phone.updateOne({ slug: 'google-pixel-9-pro' }, { $set: {
    seo_overview: `The Google Pixel 9 Pro is Google's compact flagship for users who want a premium, AI-powered smartphone without the bulk of an oversized device. Priced at $999 in the United States, it packs the full Pro camera experience into a refined 6.3-inch form factor that's easy to handle with one hand.\n\nPowered by the Tensor G4 octa-core processor — featuring a Cortex-X4 core clocked at 3.1 GHz — the Pixel 9 Pro is purpose-built for Google's on-device AI features, including advanced photo editing tools like Magic Eraser, Best Take, and real-time translation. Where this phone truly shines is photography. The triple camera array features a 50 MP main sensor with a large 1/1.31-inch format, dual pixel PDAF, multi-zone laser autofocus, and OIS, delivering exceptional detail and low-light performance. A 48 MP telephoto and 48 MP ultrawide complete the versatile setup.\n\nThe 4700 mAh battery provides solid all-day endurance, and 21W wireless charging keeps things convenient. IP68 dust and water resistance ensures the device can handle everyday hazards, including submersion in up to 1.5 meters of water for 30 minutes.\n\nFor USA buyers who value computational photography, clean Android software with 7 years of guaranteed updates, and a compact flagship experience, the Google Pixel 9 Pro is one of the smartest choices available today.`,
    verdict: `The Google Pixel 9 Pro is the best compact Android flagship for photography enthusiasts in the USA. Its 50 MP main sensor with a massive 1/1.31-inch format produces photos that rival devices costing hundreds more. Google's AI-powered software features — from Magic Eraser to Call Screen — add genuine everyday utility. At $999, it matches the iPhone 16 Pro in price while offering a cleaner software experience and 7 years of OS updates. The only trade-off is slightly less raw gaming performance versus Snapdragon competitors, but for most users, this phone delivers more than enough.`,
    pros: [
      "Exceptional triple camera system with a large 1/1.31\" main sensor and 48 MP telephoto",
      "Google's AI features (Magic Eraser, Best Take, Call Screen) add real daily value",
      "Compact 6.3-inch flagship — rare premium option for one-hand-friendly use",
      "7 years of guaranteed OS and security updates — industry-leading software support"
    ],
    cons: [
      "Tensor G4 trails Snapdragon 8 Gen 3 in raw CPU and GPU benchmarks",
      "21W wireless charging is slower than many competing flagships",
      "No headphone jack or expandable storage"
    ],
    faqs: [
      { question: "How much does the Google Pixel 9 Pro cost in the USA?", answer: "The Google Pixel 9 Pro is priced at $999 in the United States. It's available unlocked through the Google Store, Best Buy, and Amazon, as well as through carriers like T-Mobile, AT&T, and Verizon with trade-in offers and financing options." },
      { question: "Is the Google Pixel 9 Pro good for photography?", answer: "Absolutely. The Pixel 9 Pro features a triple camera system with a 50 MP main sensor (1/1.31-inch), 48 MP telephoto, and 48 MP ultrawide. Combined with Google's industry-leading computational photography and AI features like Magic Eraser and Night Sight, it produces some of the best photos of any smartphone." },
      { question: "How long will the Google Pixel 9 Pro receive software updates?", answer: "Google guarantees 7 years of Android OS updates and security patches for the Pixel 9 Pro. This means you can expect updates through 2031, making it one of the longest-supported Android phones available in the USA market." },
      { question: "Does the Google Pixel 9 Pro support wireless charging?", answer: "Yes, the Pixel 9 Pro supports 21W wireless charging. It is also compatible with standard Qi wireless chargers. While not the fastest wireless charging on the market, it is convenient for overnight or desk charging throughout the day." },
      { question: "Is the Google Pixel 9 Pro waterproof?", answer: "The Google Pixel 9 Pro has an IP68 dust and water resistance rating, meaning it can withstand submersion in up to 1.5 meters of freshwater for 30 minutes. It handles rain, splashes, and accidental drops in water without issue." }
    ],
    meta_title: "Google Pixel 9 Pro Price in USA & Full Specs | Buy or Skip?",
    meta_description: "Google Pixel 9 Pro costs $999 in the USA with Tensor G4, triple 50MP cameras, and 7 years of updates. Full specs, pros & cons inside.",
    manual_seo_done: true
  }});

  console.log(`Updated google-pixel-9-pro, modified: ${result.modifiedCount}`);
  await mongoose.disconnect();
}
run().catch(console.error);
