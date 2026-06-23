const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  // WARNING: MUST USE EXACT LOWERCASE SLUG HERE
  const result = await Phone.updateOne({ slug: 'moto-g-play-2026' }, { $set: {
    seo_overview: `The Moto G Play (2026) is Motorola's latest entry-level smartphone, offering solid everyday performance at a wallet-friendly $249 price point in the USA. It's built for budget-conscious buyers who need a reliable phone for calls, texting, social media, and light productivity without breaking the bank.

The phone features a generous 6.7-inch display that provides plenty of screen real estate for watching videos, scrolling through feeds, and reading articles. Its 50 MP main camera with PDAF captures surprisingly sharp photos for a phone in this price range, making it more than capable for social media posts, quick snapshots, and video calls. The 32 MP front-facing camera sensor ensures clear, detailed selfies.

Where the Moto G Play (2026) truly stands out is battery life — the massive 5,000 mAh battery can easily carry you through a full day and well into the next on a single charge. The inclusion of a 3.5mm headphone jack is a welcome bonus for wired headphone users, and the IP52 splash resistance offers basic protection against light rain and accidental spills. While it lacks wireless charging and won't win any benchmark battles, the Moto G Play (2026) delivers dependable performance and outstanding value for its price class.`,
    verdict: `The Moto G Play (2026) is hard to beat if you're shopping for a smartphone under $250 in the USA. It nails the essentials — a large 6.7-inch screen, a reliable 50 MP camera, marathon battery life from its 5,000 mAh cell, and a headphone jack that budget buyers still appreciate. You'll miss out on wireless charging and advanced water resistance, but at $249, those are fair trade-offs. It's an ideal phone for students, seniors, or anyone who wants a dependable daily driver without the flagship price tag.`,
    pros: [
      "Exceptional battery life from a 5,000 mAh cell easily lasts well over a day",
      "Large 6.7-inch display offers a spacious viewing experience at a budget price",
      "3.5mm headphone jack is a practical inclusion for wired audio fans",
      "50 MP main camera with PDAF delivers solid photos for this price range"
    ],
    cons: [
      "No wireless charging support",
      "IP52 rating only protects against splashes — not full submersion",
      "Performance may struggle with demanding games or heavy multitasking"
    ],
    faqs: [
      { question: "How much does the Moto G Play (2026) cost in the USA?", answer: "The Moto G Play (2026) is priced at $249 in the USA, making it one of the most affordable smartphones from Motorola's 2026 lineup." },
      { question: "Does the Moto G Play (2026) have a headphone jack?", answer: "Yes, the Moto G Play (2026) includes a 3.5mm headphone jack, allowing you to use wired headphones or earbuds without an adapter." },
      { question: "Is the Moto G Play (2026) waterproof?", answer: "It has an IP52 rating, which means it's protected against dust and light splashes of water. It is not designed to be submerged in water." },
      { question: "What camera does the Moto G Play (2026) have?", answer: "It features a 50 MP main camera with PDAF for quick autofocus, along with a 32 MP front-facing camera sensor for selfies and video calls." },
      { question: "How long does the Moto G Play (2026) battery last?", answer: "The 5,000 mAh battery provides excellent longevity, typically lasting well over a full day of regular use including calls, browsing, and social media." }
    ],
    meta_title: "Moto G Play (2026) Price in USA & Full Specs | Buy or Skip?",
    meta_description: "Moto G Play (2026) costs just $249 in the USA. 6.7\" display, 50 MP camera, 5000 mAh battery & headphone jack. See full specs, pros & cons.",
    manual_seo_done: true
  }});

  console.log(`Updated moto-g-play-2026, modified: ${result.modifiedCount}`);
  await mongoose.disconnect();
}
run().catch(console.error);
