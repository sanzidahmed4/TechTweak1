import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('techtweak');
    
    const brand = await db.collection('brands').findOne({ name: { $regex: /^vivo$/i } });
    if (!brand) throw new Error("Vivo brand not found");

    const phoneData = {
      name: "Vivo T3x",
      slug: "vivo-t3x",
      brand: brand._id,
      price_usd: 150,
      seo_overview: "The Vivo T3x 5G is a powerhouse entry-level device that redefines battery expectations for budget-conscious consumers looking for imported value in the USA. Introduced to the global market in April 2024, this smartphone's standout feature is undeniably its gargantuan 6,000 mAh battery capacity, providing unmatched multiday endurance for heavy usage, video streaming, and continuous browsing. Driving the display is a large 6.72-inch panel, while the capable Snapdragon 6 Gen 1 chipset ensures snappy daily navigation and competent 5G connectivity. Offering up to 8GB of RAM and 256GB of internal storage, it brings modern multitasking capabilities to a price segment typically lacking in resources. The device runs on Android 14 out of the box with Vivo's clean Funtouch OS 14 interface. Furthermore, the inclusion of an IP64 rating guarantees robust protection against everyday dust and water splashes. Though it was never officially launched stateside, its highly attractive overseas launch price of approximately $150 makes it an extremely tempting option for users prioritizing battery longevity above all else, provided they use a compatible import service.",
      verdict: "For USA buyers whose main priority is not having to charge their phone every day, the imported Vivo T3x 5G is a spectacular choice. The monumental 6,000 mAh battery is a rare commodity even among flagship devices, and combining it with the energy-efficient Snapdragon 6 Gen 1 chip creates a phone that seemingly lasts forever. The large 6.72-inch display and IP64 durability rating further enhance its value. Of course, bringing this phone into the USA requires verifying carrier compatibility and accepting the lack of official customer support. However, if extreme battery life on a strict budget is your goal, the T3x is hard to beat.",
      pros: [
        "Massive 6,000 mAh battery ensures exceptional multiday usage.",
        "Modern and efficient Snapdragon 6 Gen 1 processor.",
        "Excellent durability thanks to an IP64 dust and splash rating.",
        "Highly affordable price point for the hardware provided."
      ],
      cons: [
        "No official US market availability or warranty support.",
        "LCD screen lacks the color richness of AMOLED competitors.",
        "Can be slightly bulky due to the oversized battery."
      ],
      faqs: [
        { question: "What is the battery size of the Vivo T3x 5G?", answer: "The device boasts a massive 6,000 mAh battery for extreme longevity." },
        { question: "Does the Vivo T3x have a 5G connection?", answer: "Yes, it supports 5G networks for high-speed browsing and downloading." },
        { question: "What processor is inside the Vivo T3x?", answer: "It utilizes the capable Qualcomm Snapdragon 6 Gen 1 chipset." },
        { question: "Is the Vivo T3x resistant to water?", answer: "It features an IP64 rating, meaning it can withstand dust and light water splashes." },
        { question: "How large is the display on the Vivo T3x?", answer: "The smartphone features a spacious 6.72-inch screen." }
      ],
      metaDescription: "Discover the Vivo T3x 5G featuring a massive 6000 mAh battery, a Snapdragon 6 Gen 1 processor, and IP64 protection. See US pricing and full specs today.",
      updatedAt: new Date()
    };

    const result = await db.collection('phones').updateOne(
      { name: "Vivo T3x" },
      { $set: phoneData },
      { upsert: true }
    );
    console.log("Successfully upserted Vivo T3x. UpsertedId:", result.upsertedId, "Modified:", result.modifiedCount);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
