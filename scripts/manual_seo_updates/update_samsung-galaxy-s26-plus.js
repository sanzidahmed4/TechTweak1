const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  // WARNING: MUST USE EXACT LOWERCASE SLUG HERE
  const result = await Phone.updateOne({ slug: 'samsung-galaxy-s26-plus' }, { $set: {
    seo_overview: `The Samsung Galaxy S26+ is Samsung's refined plus-sized flagship for 2026, striking an ideal balance between the compact S26 and the feature-packed S26 Ultra. Available in the USA at $1,049, it delivers a premium experience with a spacious 6.7-inch display that's perfect for streaming, gaming, and productivity.

Powering the Galaxy S26+ is an octa-core/deca-core processor that handles everything from intensive multitasking to graphically demanding mobile games with ease. The triple camera array features a 50 MP primary sensor with OIS for sharp, stable photos, a 50 MP telephoto lens with 3x optical zoom for getting closer to your subject without losing detail, and a 12 MP ultrawide camera for sweeping landscape shots and tight group photos.

The 5,000 mAh battery is built to last a full day and beyond, even with heavy usage. Wireless charging at 15W keeps things convenient, while the IP68 dust and water resistance rating (up to 1.5m for 30 minutes) means you don't have to worry about rain, spills, or accidental splashes. Samsung's Galaxy AI features further enhance the software experience with intelligent photo editing, real-time translation, and smart summarization tools. For buyers who want a large-screen Samsung flagship without jumping to the Ultra price tier, the Galaxy S26+ is an excellent pick.`,
    verdict: `The Samsung Galaxy S26+ is the smart choice for buyers who want Samsung's flagship experience on a bigger screen without paying Ultra prices. At $1,049, you get a gorgeous 6.7-inch display, a versatile triple camera with 3x optical zoom, all-day battery life, and robust IP68 water resistance. It's not the cheapest option, and the 15W wireless charging feels slow compared to competitors, but the overall package — including Samsung's industry-leading software support and Galaxy AI — makes it one of the best Android phones you can buy in the USA this year.`,
    pros: [
      "50 MP telephoto with 3x optical zoom offers excellent versatility for the price",
      "5,000 mAh battery comfortably lasts through a full day of heavy use",
      "IP68 water and dust resistance provides robust everyday protection",
      "Large 6.7-inch display is ideal for media consumption and multitasking"
    ],
    cons: [
      "15W wireless charging is noticeably slower than what competitors offer",
      "$1,049 price point may be a stretch for those who don't need the larger screen",
      "No 3.5mm headphone jack"
    ],
    faqs: [
      { question: "How much does the Samsung Galaxy S26+ cost in the USA?", answer: "The Samsung Galaxy S26+ is priced at $1,049 in the USA, positioning it between the standard Galaxy S26 and the premium Galaxy S26 Ultra." },
      { question: "What processor does the Samsung Galaxy S26+ use?", answer: "The Galaxy S26+ is powered by an octa-core/deca-core processor designed to handle demanding apps, gaming, and multitasking with ease." },
      { question: "Does the Samsung Galaxy S26+ have a telephoto camera?", answer: "Yes, it features a 50 MP telephoto lens with 3x optical zoom, alongside a 50 MP main camera with OIS and a 12 MP ultrawide camera." },
      { question: "Is the Samsung Galaxy S26+ waterproof?", answer: "The Galaxy S26+ carries an IP68 rating, meaning it can withstand submersion in up to 1.5 meters of water for 30 minutes. It is also dust resistant." },
      { question: "How long does the Samsung Galaxy S26+ battery last?", answer: "With a 5,000 mAh battery, the Galaxy S26+ is built to last a full day of heavy use, including streaming, browsing, and social media." }
    ],
    meta_title: "Samsung Galaxy S26+ Price in USA & Full Specs | Buy or Skip?",
    meta_description: "Samsung Galaxy S26+ costs $1,049 in the USA. 6.7\" display, 50 MP triple camera with 3x zoom, 5000 mAh battery. Full specs, pros, cons & FAQs.",
    manual_seo_done: true
  }});

  console.log(`Updated samsung-galaxy-s26-plus, modified: ${result.modifiedCount}`);
  await mongoose.disconnect();
}
run().catch(console.error);
