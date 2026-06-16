const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  // WARNING: MUST USE EXACT LOWERCASE SLUG HERE
  const result = await Phone.updateOne({ slug: 'iqoo-neo-9s-pro' }, { $set: {
    seo_overview: `The iQOO Neo 9S Pro is a performance-driven smartphone that punches well above its price class, powered by the MediaTek Dimensity 9300+ chipset built on a cutting-edge 4nm process. This flagship-grade processor delivers blistering speeds for gaming, multitasking, and intensive app usage, making the Neo 9S Pro one of the most powerful phones you can buy under $400 in the USA.

The 6.78-inch display offers an immersive viewing experience with approximately 89.7% screen-to-body ratio, ideal for streaming, gaming, and everyday browsing. On the camera front, the dual-camera system features a 50 MP primary sensor with OIS and f/1.9 aperture alongside a 50 MP ultrawide lens, delivering sharp and versatile photography across a range of scenarios. The large 1/1.49-inch sensor size ensures excellent light capture for detailed low-light shots.

Battery life is a strong suit with a generous 5160 mAh cell that can easily power through a full day of heavy usage. While the iQOO Neo 9S Pro does lack wireless charging support and an official IP water resistance rating, these trade-offs are understandable at its aggressive $375 price point. For USA buyers who prioritize raw performance and camera quality over premium extras, the iQOO Neo 9S Pro represents outstanding value in the competitive mid-range segment.`,
    verdict: `The iQOO Neo 9S Pro is a phenomenal value proposition for USA buyers who demand flagship-tier processing power without the flagship price tag. The Dimensity 9300+ chipset rivals the best Qualcomm Snapdragon offerings, and the dual 50 MP camera system is surprisingly capable for a phone at this price. The 5160 mAh battery ensures all-day endurance, and the large 6.78-inch display is excellent for media consumption. The main caveats are the absence of wireless charging and no official IP water resistance rating. If those aren't dealbreakers for you, the Neo 9S Pro at $375 is one of the smartest buys you can make right now.`,
    pros: [
      "Flagship-grade Dimensity 9300+ processor at a mid-range price",
      "Dual 50 MP camera system with large 1/1.49-inch main sensor and OIS",
      "Generous 5160 mAh battery for all-day usage",
      "Immersive 6.78-inch display with ~89.7% screen-to-body ratio"
    ],
    cons: [
      "No wireless charging support",
      "No official IP water resistance rating",
      "No headphone jack for wired audio"
    ],
    faqs: [
      { question: "What processor does the iQOO Neo 9S Pro have?", answer: "The iQOO Neo 9S Pro is powered by the MediaTek Dimensity 9300+ chipset, built on a 4nm process. This is a flagship-grade processor that delivers exceptional performance for gaming, multitasking, and demanding applications." },
      { question: "Is the iQOO Neo 9S Pro waterproof?", answer: "No, the iQOO Neo 9S Pro does not carry an official IP water resistance rating. It is advisable to keep the device away from water and moisture to prevent damage." },
      { question: "How good is the iQOO Neo 9S Pro camera?", answer: "The iQOO Neo 9S Pro features a dual 50 MP camera setup with a large 1/1.49-inch primary sensor, OIS, and PDAF. It captures detailed, vibrant photos in both daylight and low-light conditions, paired with a 50 MP ultrawide lens for versatile shooting." },
      { question: "Does the iQOO Neo 9S Pro support wireless charging?", answer: "No, the iQOO Neo 9S Pro does not support wireless charging. It relies on wired charging to recharge its 5160 mAh battery." },
      { question: "How much does the iQOO Neo 9S Pro cost in the USA?", answer: "The iQOO Neo 9S Pro is priced at approximately $375 in the USA, making it one of the most affordable phones with a flagship-class Dimensity 9300+ processor." }
    ],
    meta_title: "iQOO Neo 9S Pro Price in USA & Full Specs | Buy or Skip?",
    meta_description: "iQOO Neo 9S Pro price is $375 in the USA. Dimensity 9300+, dual 50 MP cameras, 5160 mAh battery. See full specs, pros & cons, and verdict.",
    manual_seo_done: true
  }});

  console.log(`Updated iqoo-neo-9s-pro, modified: ${result.modifiedCount}`);
  await mongoose.disconnect();
}
run().catch(console.error);
