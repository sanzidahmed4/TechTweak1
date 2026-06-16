const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  // WARNING: MUST USE EXACT LOWERCASE SLUG HERE
  const result = await Phone.updateOne({ slug: 'iqoo-z9' }, { $set: {
    seo_overview: `The iQOO Z9 is a well-rounded budget smartphone that brings surprising capability to the sub-$250 price segment. Powered by the MediaTek Dimensity 7200 built on a 4nm process, it offers efficient and responsive performance for everyday tasks, social media, casual gaming, and streaming. The processor strikes a smart balance between power and battery efficiency, ensuring smooth day-to-day operation.

The 6.67-inch display provides a comfortable viewing experience with an approximately 86.8% screen-to-body ratio, making it well-suited for browsing, video calls, and media consumption. On the photography side, the iQOO Z9 features a 50 MP primary camera with OIS, PDAF, and an f/1.8 aperture that captures clear, vibrant photos in good lighting conditions. The 2 MP depth sensor assists with portrait mode shots, adding natural background blur to your subjects.

A 5000 mAh battery ensures reliable all-day endurance, comfortably lasting from morning to night under typical usage. The IP54 dust and splash resistance rating provides basic protection against accidental splashes and dusty environments. While the iQOO Z9 omits wireless charging and a headphone jack, these are expected trade-offs at its $250 price point. For USA buyers looking for a capable, no-frills smartphone that handles the essentials well without straining the wallet, the iQOO Z9 is a solid and dependable option.`,
    verdict: `The iQOO Z9 is an excellent entry point for USA buyers who want a capable smartphone without overspending. The Dimensity 7200 processor handles everyday tasks smoothly, and the 50 MP OIS camera delivers surprisingly good photos for a budget device. The 5000 mAh battery provides dependable all-day life, and IP54 protection adds peace of mind for daily use. It won't impress with extras like wireless charging or a telephoto lens, but at $250, it covers all the fundamentals exceptionally well. If you need a reliable daily driver at a friendly price, the iQOO Z9 is well worth considering.`,
    pros: [
      "Efficient Dimensity 7200 processor on 4nm for smooth daily performance",
      "50 MP primary camera with OIS delivers clear, stable photos",
      "5000 mAh battery provides reliable all-day endurance",
      "IP54 dust and splash resistance for basic everyday protection"
    ],
    cons: [
      "No wireless charging support",
      "2 MP depth sensor is limited — no ultrawide or telephoto lens",
      "No headphone jack"
    ],
    faqs: [
      { question: "Is the iQOO Z9 a good phone for the price?", answer: "Yes, the iQOO Z9 offers excellent value at $250. It features a capable Dimensity 7200 processor, a 50 MP OIS camera, and a 5000 mAh battery — a well-rounded package that handles everyday tasks, photography, and media consumption reliably." },
      { question: "What processor does the iQOO Z9 have?", answer: "The iQOO Z9 is powered by the MediaTek Dimensity 7200, a 4nm chipset that delivers efficient, smooth performance for daily tasks, social media, casual gaming, and streaming." },
      { question: "Does the iQOO Z9 have water resistance?", answer: "The iQOO Z9 has an IP54 rating, which provides protection against dust ingress and water splashes. It can handle light rain and accidental spills but is not designed for submersion." },
      { question: "How good is the iQOO Z9 camera?", answer: "The iQOO Z9 features a 50 MP primary camera with OIS and PDAF, which takes sharp, stable photos in daylight and decent shots in moderate low-light conditions. A 2 MP depth sensor assists with portrait mode, though there is no ultrawide or telephoto lens." },
      { question: "How much does the iQOO Z9 cost in the USA?", answer: "The iQOO Z9 is priced at approximately $250 in the USA, positioning it as one of the most affordable smartphones with a Dimensity 7200 processor and 50 MP OIS camera." }
    ],
    meta_title: "iQOO Z9 Price in USA & Full Specs | Buy or Skip?",
    meta_description: "iQOO Z9 price is $250 in the USA. Dimensity 7200, 50 MP OIS camera, 5000 mAh battery. Check full specs, pros, cons, and our expert verdict.",
    manual_seo_done: true
  }});

  console.log(`Updated iqoo-z9, modified: ${result.modifiedCount}`);
  await mongoose.disconnect();
}
run().catch(console.error);
