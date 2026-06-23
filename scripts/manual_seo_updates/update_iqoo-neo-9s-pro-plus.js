const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  // WARNING: MUST USE EXACT LOWERCASE SLUG HERE
  const result = await Phone.updateOne({ slug: 'iqoo-neo-9s-pro-plus' }, { $set: {
    seo_overview: `The iQOO Neo 9S Pro+ is a performance-first smartphone that delivers flagship-grade power at a fraction of the usual cost. Priced at just $420 in the United States, it undercuts virtually every Snapdragon 8 Gen 3-powered competitor by hundreds of dollars, making it one of the most aggressive value propositions in the market.\n\nAt its heart is the Qualcomm Snapdragon 8 Gen 3 processor built on a 4nm process — the same chip found in phones costing $1,000 or more. Whether you're pushing through demanding games like Genshin Impact at high settings, editing 4K video, or running AI-intensive applications, this phone handles it all without flinching. The expansive 6.78-inch display with a 89.7% screen-to-body ratio provides a smooth, immersive visual experience.\n\nThe dual camera system features a 50 MP main sensor with OIS and a 50 MP ultrawide lens — a surprisingly capable setup for this price tier. Both sensors deliver sharp, detailed photos with natural color reproduction. The 5500 mAh battery is a major highlight, providing outstanding endurance that comfortably lasts a full day of heavy, performance-intensive use.\n\nThe main trade-off at this price point is the lack of an official IP water resistance rating, so extra care around water is advised. There's also no wireless charging support. For USA buyers who prioritize raw performance and gaming prowess above all else, the iQOO Neo 9S Pro+ is an unbeatable deal.`,
    verdict: `The iQOO Neo 9S Pro+ is a performance bargain that's hard to ignore at $420. Getting a Snapdragon 8 Gen 3 chip — the same silicon inside $1,000+ flagships — at this price is genuinely remarkable. The 5500 mAh battery keeps up with power-hungry gaming sessions, and the dual 50 MP camera system punches above its class. The missing IP rating and lack of wireless charging are the compromises you make, but for gamers and performance enthusiasts in the USA who care more about speed than splash resistance, this phone offers flagship muscle at a mid-range price.`,
    pros: [
      "Snapdragon 8 Gen 3 processor at just $420 — flagship performance at mid-range pricing",
      "Massive 5500 mAh battery handles heavy gaming and all-day use with ease",
      "Dual 50 MP camera setup (main + ultrawide) delivers strong photo quality",
      "Large 6.78-inch display with nearly 90% screen-to-body ratio"
    ],
    cons: [
      "No official IP water resistance rating — handle with care around liquids",
      "No wireless charging support",
      "Limited US carrier compatibility and availability compared to mainstream brands"
    ],
    faqs: [
      { question: "How much does the iQOO Neo 9S Pro+ cost in the USA?", answer: "The iQOO Neo 9S Pro+ is priced at approximately $420 in the United States. It is primarily available through online retailers and import channels. Check platforms like Amazon, AliExpress, or the official iQOO website for current pricing and availability." },
      { question: "Is the iQOO Neo 9S Pro+ good for gaming?", answer: "Yes, the iQOO Neo 9S Pro+ is one of the best gaming phones at its price. Powered by the Snapdragon 8 Gen 3 — the same chip in Samsung Galaxy S24 Ultra and similar flagships — it runs demanding titles like Genshin Impact and PUBG Mobile at max settings with smooth frame rates and minimal thermal throttling." },
      { question: "Does the iQOO Neo 9S Pro+ have wireless charging?", answer: "No, the iQOO Neo 9S Pro+ does not support wireless charging. It relies on wired fast charging to top up its large 5500 mAh battery. This is a common trade-off in performance-focused phones at this price point." },
      { question: "Is the iQOO Neo 9S Pro+ waterproof?", answer: "The iQOO Neo 9S Pro+ does not carry an official IP water resistance rating. While the phone may handle minor splashes, it is not designed to withstand submersion. Using a protective case and keeping it away from water is recommended." },
      { question: "How does the iQOO Neo 9S Pro+ camera compare to flagships?", answer: "The iQOO Neo 9S Pro+ features a dual 50 MP camera system with OIS on the main lens and a 50 MP ultrawide. While it produces sharp, well-exposed photos that rival many flagships in good lighting, it lacks a telephoto lens and advanced computational photography features found on Pixel or iPhone devices." }
    ],
    meta_title: "iQOO Neo 9S Pro+ Price in USA & Full Specs | Buy or Skip?",
    meta_description: "iQOO Neo 9S Pro+ packs Snapdragon 8 Gen 3 power for just $420. See full specs, 5500 mAh battery, dual 50MP cameras, and our verdict.",
    manual_seo_done: true
  }});

  console.log(`Updated iqoo-neo-9s-pro-plus, modified: ${result.modifiedCount}`);
  await mongoose.disconnect();
}
run().catch(console.error);
