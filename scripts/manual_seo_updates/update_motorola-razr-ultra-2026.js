const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  // WARNING: MUST USE EXACT LOWERCASE SLUG HERE
  const result = await Phone.updateOne({ slug: 'motorola-razr-ultra-2026' }, { $set: {
    seo_overview: `The Motorola Razr Ultra (2026) is Motorola's most ambitious foldable smartphone yet, designed for power users who refuse to compromise on performance or style. Priced at $1,499 in the USA, this premium flip phone features a stunning 7.0-inch main display and a generously sized 4.0-inch cover screen that lets you handle notifications, take selfies, and run apps without ever flipping the phone open.

Under the hood, an octa-core processor ensures buttery-smooth multitasking, gaming, and everyday performance. The camera system is where the Razr Ultra truly shines — a 200 MP primary sensor with OIS captures breathtaking detail in every shot, while the 50 MP ultrawide and 50 MP periscope telephoto lenses give you incredible versatility for landscapes, group photos, and distant subjects alike. The f/1.7 aperture and LOFIC sensor technology deliver exceptional low-light performance that rivals many traditional flagship smartphones.

Battery life is backed by a 4,500 mAh cell, and the 30W wireless charging support means you can top up quickly without fumbling with cables. The IP48 dust and water resistance rating provides everyday peace of mind. For anyone in the market for a cutting-edge foldable that doesn't sacrifice camera quality or screen real estate, the Motorola Razr Ultra (2026) is a compelling choice.`,
    verdict: `The Motorola Razr Ultra (2026) is one of the best foldable phones you can buy in the USA right now. Its 200 MP triple camera system genuinely competes with traditional flagship slabs, and the 4.0-inch cover screen is large enough to be useful on its own. At $1,499, it's a significant investment, but you're getting premium build quality, 30W wireless charging, and a periscope telephoto lens — features rarely found in flip-style foldables. If you want a head-turning phone that folds into your pocket without sacrificing photography or productivity, this is the one to buy.`,
    pros: [
      "200 MP primary camera with OIS and periscope telephoto delivers flagship-grade photography",
      "Large 4.0-inch cover screen is fully functional for apps and quick tasks",
      "30W wireless charging is the fastest in any current foldable flip phone",
      "7.0-inch main display offers a spacious, immersive viewing experience"
    ],
    cons: [
      "IP48 rating is significantly lower than the IP68 standard found on most flagships",
      "$1,499 price tag makes it one of the most expensive foldables on the market",
      "No 3.5mm headphone jack"
    ],
    faqs: [
      { question: "How much does the Motorola Razr Ultra (2026) cost in the USA?", answer: "The Motorola Razr Ultra (2026) is priced at $1,499 in the USA, positioning it as a premium foldable smartphone." },
      { question: "Does the Motorola Razr Ultra (2026) support wireless charging?", answer: "Yes, it supports 30W wireless charging, making it one of the fastest wirelessly charging foldable phones available." },
      { question: "Is the Motorola Razr Ultra (2026) waterproof?", answer: "It carries an IP48 rating, which means it offers protection against solid objects larger than 1mm and splashing water. It is not fully waterproof and should not be submerged." },
      { question: "What cameras does the Motorola Razr Ultra (2026) have?", answer: "It features a triple camera system: a 200 MP main sensor with OIS, a 50 MP ultrawide lens, and a 50 MP periscope telephoto lens for impressive zoom capabilities." },
      { question: "How big is the cover screen on the Motorola Razr Ultra (2026)?", answer: "The cover screen measures 4.0 inches, which is large enough to run most apps, respond to messages, take selfies, and manage notifications without opening the phone." }
    ],
    meta_title: "Motorola Razr Ultra (2026) Price in USA & Full Specs | Buy or Skip?",
    meta_description: "Motorola Razr Ultra (2026) starts at $1,499 in the USA. 200 MP camera, 7.0\" foldable display, 30W wireless charging. See full specs, pros & cons.",
    manual_seo_done: true
  }});

  console.log(`Updated motorola-razr-ultra-2026, modified: ${result.modifiedCount}`);
  await mongoose.disconnect();
}
run().catch(console.error);
