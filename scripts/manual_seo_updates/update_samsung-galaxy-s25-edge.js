const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  // WARNING: MUST USE EXACT LOWERCASE SLUG HERE
  const result = await Phone.updateOne({ slug: 'samsung-galaxy-s25-edge' }, { $set: {
    seo_overview: `The Samsung Galaxy S25 Edge brings back the iconic "Edge" branding with a sleek, ultra-slim design that stands apart from the rest of Samsung's S25 lineup. Priced at $899 in the USA, it targets buyers who want a premium Samsung flagship with a distinctively thin profile and cutting-edge performance.

Powering the Galaxy S25 Edge is the Qualcomm Snapdragon 8 Elite octa-core processor, the same chip found in Samsung's most expensive phones. This ensures blazing-fast app launches, smooth gaming, and effortless multitasking across its beautiful 6.7-inch display. Whether you're editing photos, streaming 4K content, or running multiple apps side by side, the S25 Edge handles it all without breaking a sweat.

The camera system is headlined by a massive 200 MP main sensor with f/1.7 aperture and OIS, capturing incredibly detailed photos with rich color and clarity. A 10 MP telephoto lens with 3x optical zoom lets you get closer to your subjects, while the 12 MP ultrawide camera captures expansive scenes. The 50 MP OIS-equipped secondary shooter adds further flexibility to the system.

The 4,500 mAh battery keeps the phone going through a busy day, supported by 15W Qi2-ready wireless charging. With IP68 dust and water resistance rated for submersion up to 1.5 meters for 30 minutes, the Galaxy S25 Edge is built to withstand everyday hazards while looking effortlessly premium.`,
    verdict: `The Samsung Galaxy S25 Edge is the perfect pick for buyers who want flagship power in the thinnest possible package. At $899, you get the full Snapdragon 8 Elite experience, a stunning 200 MP camera, and Samsung's excellent IP68 water resistance — all in a design that turns heads. The 4,500 mAh battery is slightly smaller than its siblings, and wireless charging tops out at 15W, but the trade-off for that slim, elegant form factor is well worth it. If design matters to you as much as specs, the S25 Edge is Samsung's most stylish flagship.`,
    pros: [
      "200 MP main camera with OIS captures extraordinarily detailed and vibrant photos",
      "Snapdragon 8 Elite processor delivers top-tier performance for any task",
      "Ultra-slim, premium design sets it apart from every other flagship",
      "IP68 water and dust resistance ensures durability in everyday conditions"
    ],
    cons: [
      "4,500 mAh battery is smaller than the Galaxy S25+ and may require midday charging",
      "15W wireless charging is slower than what many competitors offer at this price",
      "No 3.5mm headphone jack"
    ],
    faqs: [
      { question: "How much does the Samsung Galaxy S25 Edge cost in the USA?", answer: "The Samsung Galaxy S25 Edge is priced at $899 in the USA, slotting between the standard Galaxy S25 and the Galaxy S25+ in Samsung's lineup." },
      { question: "What processor does the Samsung Galaxy S25 Edge use?", answer: "It is powered by the Qualcomm Snapdragon 8 Elite octa-core processor, delivering flagship-level performance for gaming, multitasking, and AI-powered features." },
      { question: "Does the Samsung Galaxy S25 Edge have a 200 MP camera?", answer: "Yes, the Galaxy S25 Edge features a 200 MP main camera with f/1.7 aperture and OIS, capable of capturing extremely detailed photos in virtually any lighting condition." },
      { question: "Is the Samsung Galaxy S25 Edge waterproof?", answer: "Yes, it has an IP68 rating and can withstand submersion in up to 1.5 meters of water for 30 minutes. It is also fully dust resistant." },
      { question: "How does the Galaxy S25 Edge compare to the Galaxy S25+?", answer: "The S25 Edge offers a slimmer design and a 200 MP main camera compared to the S25+'s 50 MP sensor. However, the S25+ has a larger 4,900 mAh battery and costs $999. The Edge prioritizes design and camera resolution, while the S25+ focuses on battery life and value." }
    ],
    meta_title: "Samsung Galaxy S25 Edge Price in USA & Full Specs | Buy or Skip?",
    meta_description: "Samsung Galaxy S25 Edge at $899 in the USA. 200 MP camera, Snapdragon 8 Elite, 6.7\" display, IP68 rated. See full specs, pros, cons & FAQs.",
    manual_seo_done: true
  }});

  console.log(`Updated samsung-galaxy-s25-edge, modified: ${result.modifiedCount}`);
  await mongoose.disconnect();
}
run().catch(console.error);
