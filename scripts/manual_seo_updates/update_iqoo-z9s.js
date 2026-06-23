const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  // WARNING: MUST USE EXACT LOWERCASE SLUG HERE
  const result = await Phone.updateOne({ slug: 'iqoo-z9s' }, { $set: {
    seo_overview: `The iQOO Z9s is a budget-friendly smartphone that prioritizes battery endurance and display quality at an incredibly competitive price. At just $240 in the United States, it targets cost-conscious buyers who refuse to compromise on screen size and daily reliability.\n\nPowered by the MediaTek Dimensity 7300 chip built on an efficient 4nm process, the iQOO Z9s handles social media browsing, video streaming, and casual gaming with smooth, lag-free performance. The 6.77-inch display with an impressive 90.3% screen-to-body ratio delivers an immersive viewing experience that belies its affordable price tag.\n\nThe camera setup features a 50 MP main sensor with PDAF and OIS, which is a notable inclusion at this price — optical image stabilization helps capture sharper photos in low light and during handheld video recording. A 2 MP depth sensor assists with portrait mode effects. While it's not a photography powerhouse, it handles everyday shots, social media content, and video calls with confidence.\n\nThe real hero spec is the massive 5500 mAh battery, which comfortably powers the phone through a full day and well into a second day for lighter users. IP64 dust and water resistance adds a layer of protection against splashes and rain. For USA buyers shopping on a tight budget who want a big display, long battery life, and a capable main camera, the iQOO Z9s delivers exceptional value per dollar.`,
    verdict: `The iQOO Z9s is a standout budget phone that nails the essentials at $240. The 5500 mAh battery is a workhorse that eliminates charging anxiety, and the Dimensity 7300 processor keeps daily tasks running smoothly. The 50 MP OIS camera is a genuine surprise at this price, producing respectable photos that most budget phones simply can't match. However, the lack of wireless charging, no headphone jack, and a basic 2 MP depth sensor instead of an ultrawide lens are notable trade-offs. For USA buyers who prioritize battery life and display size over camera versatility, it's a smart buy.`,
    pros: [
      "Massive 5500 mAh battery delivers exceptional two-day endurance for light users",
      "50 MP main camera with OIS — rare stabilization at the sub-$250 price point",
      "Dimensity 7300 (4nm) offers efficient, smooth performance for everyday tasks",
      "Large 6.77-inch display with 90.3% screen-to-body ratio for immersive viewing"
    ],
    cons: [
      "No ultrawide camera — the 2 MP depth sensor adds minimal real-world value",
      "No wireless charging or headphone jack",
      "IP64 splash resistance is less protective than IP68 found on pricier phones"
    ],
    faqs: [
      { question: "How much does the iQOO Z9s cost in the USA?", answer: "The iQOO Z9s is priced at approximately $240 in the United States. Availability may vary, as iQOO primarily sells through online retailers. Check Amazon and the official iQOO website for the latest pricing and stock availability." },
      { question: "Is the iQOO Z9s good for gaming?", answer: "The iQOO Z9s handles casual and mid-tier games well thanks to the MediaTek Dimensity 7300 (4nm) processor. Titles like PUBG Mobile and Call of Duty Mobile run smoothly at medium settings. However, for heavy gaming at max graphics, you may want to consider a phone with a more powerful chipset." },
      { question: "Does the iQOO Z9s have a good camera?", answer: "The iQOO Z9s features a 50 MP main camera with optical image stabilization (OIS), which is impressive for a phone at this price. It captures clear, well-exposed photos in good lighting and decent results in low light. The secondary 2 MP depth sensor helps with portrait blur effects but is limited in functionality." },
      { question: "How long does the iQOO Z9s battery last?", answer: "With a 5500 mAh battery and the efficient Dimensity 7300 chipset, the iQOO Z9s easily lasts a full day of heavy use. Light to moderate users can expect the phone to stretch comfortably into a second day before needing a charge." },
      { question: "Is the iQOO Z9s water resistant?", answer: "The iQOO Z9s has an IP64 rating, which means it is protected against dust ingress and water splashes from any direction. It can handle rain and accidental spills, but it is not rated for full submersion in water like IP68-rated phones." }
    ],
    meta_title: "iQOO Z9s Price in USA & Full Specs | Buy or Skip?",
    meta_description: "iQOO Z9s is priced at $240 with a 5500 mAh battery, 50 MP OIS camera, and Dimensity 7300 chip. See full specs, pros & cons here.",
    manual_seo_done: true
  }});

  console.log(`Updated iqoo-z9s, modified: ${result.modifiedCount}`);
  await mongoose.disconnect();
}
run().catch(console.error);
