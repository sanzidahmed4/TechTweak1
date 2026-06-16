const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  // WARNING: MUST USE EXACT LOWERCASE SLUG HERE
  const result = await Phone.updateOne({ slug: 'moto-g-stylus-5g-2025' }, { $set: {
    seo_overview: `The Moto G Stylus 5G (2025) is Motorola's best mid-range productivity phone, delivering a built-in stylus experience at a price that won't break the bank. Priced at $399 in the United States, it brings a compelling mix of features that punch well above its weight class. The generous 6.7-inch display provides ample screen real estate for note-taking, sketching, and multitasking, making the included stylus feel right at home.\n\nUnder the hood, the device handles everyday tasks and moderate gaming with ease. Photography is covered by a capable 50 MP main camera with OIS for sharp, blur-free shots, alongside a 13 MP ultrawide lens for capturing sweeping landscapes and group photos. The 5000 mAh battery is a standout, comfortably lasting a full day of heavy use, and it even supports 15W wireless charging — a rare perk at this price point.\n\nDurability is another strong suit. With IP68 dust and water resistance plus MIL-STD-810H military-grade certification, this phone is built to survive drops, dust, and accidental splashes. Audiophiles will appreciate the inclusion of a 3.5mm headphone jack, a feature increasingly absent from modern smartphones. For USA buyers seeking a reliable, stylus-equipped phone without paying flagship prices, the Moto G Stylus 5G (2025) is a seriously strong contender.`,
    verdict: `The Moto G Stylus 5G (2025) is the go-to mid-range phone for productivity-minded USA buyers. At $399, you get IP68 water resistance, MIL-STD-810H durability, a built-in stylus, wireless charging, and a headphone jack — features you rarely see combined at this price. The 50 MP OIS camera takes dependable photos, and the 5000 mAh battery easily powers through a full day. While it won't match flagships in raw processing power or camera versatility, it delivers outstanding value for students, professionals, and anyone who loves taking handwritten notes on the go.`,
    pros: [
      "Built-in stylus with a spacious 6.7-inch display for effortless note-taking",
      "IP68 + MIL-STD-810H durability — among the toughest mid-range phones available",
      "15W wireless charging and a 3.5mm headphone jack at just $399",
      "5000 mAh battery delivers reliable all-day endurance"
    ],
    cons: [
      "Limited to a dual camera setup — no dedicated telephoto lens",
      "Processing power may struggle with demanding 3D games"
    ],
    faqs: [
      { question: "Does the Moto G Stylus 5G (2025) support 5G networks in the USA?", answer: "Yes, the Moto G Stylus 5G (2025) supports 5G connectivity and is compatible with major US carriers including T-Mobile, AT&T, and Verizon, giving you access to faster data speeds where 5G coverage is available." },
      { question: "Is the Moto G Stylus 5G (2025) waterproof?", answer: "The Moto G Stylus 5G (2025) carries an IP68 rating, meaning it can withstand submersion in up to 1.5 meters of freshwater for 30 minutes. It also meets MIL-STD-810H military standards for shock and drop resistance." },
      { question: "Does the Moto G Stylus 5G (2025) have wireless charging?", answer: "Yes, it supports 15W wireless charging, which is an uncommon feature in the under-$400 price range. You can use any Qi-compatible wireless charger to top up the 5000 mAh battery." },
      { question: "How good is the camera on the Moto G Stylus 5G (2025)?", answer: "The phone features a 50 MP main camera with optical image stabilization (OIS) for sharp, steady photos, paired with a 13 MP ultrawide lens. It performs well in daylight and produces solid results in moderate low-light conditions." },
      { question: "Does the Moto G Stylus 5G (2025) have a headphone jack?", answer: "Yes, the Moto G Stylus 5G (2025) retains the 3.5mm headphone jack, allowing you to use your favorite wired headphones or earbuds without needing a dongle or adapter." }
    ],
    meta_title: "Moto G Stylus 5G (2025) Price in USA & Full Specs | Buy or Skip?",
    meta_description: "Moto G Stylus 5G (2025) starts at $399 in the USA. See full specs, camera details, battery life, pros & cons, and our expert verdict.",
    manual_seo_done: true
  }});

  console.log(`Updated moto-g-stylus-5g-2025, modified: ${result.modifiedCount}`);
  await mongoose.disconnect();
}
run().catch(console.error);
