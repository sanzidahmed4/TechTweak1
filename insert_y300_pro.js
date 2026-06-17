import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('techtweak');
    
    // Find Vivo brand ID
    const brand = await db.collection('brands').findOne({ name: { $regex: /^vivo$/i } });
    if (!brand) throw new Error("Vivo brand not found");

    const phoneData = {
      name: "Vivo Y300 Pro",
      slug: "vivo-y300-pro",
      brand: brand._id,
      price_usd: 253,
      seo_overview: "The Vivo Y300 Pro is an impressive mid-range smartphone that brings flagship-level aesthetics and a massive battery capacity to American buyers looking for longevity and style. Announced in September 2024, this device stands out with its gorgeous 6.77-inch AMOLED curved display boasting an incredibly high peak brightness of 5,000 nits and a smooth 120Hz refresh rate. Powering the experience is the reliable Snapdragon 6 Gen 1 chipset, ensuring efficient daily multitasking, casual gaming, and smooth media consumption. One of the biggest highlights for USA tech enthusiasts is the astonishing 6,500 mAh Silicon-Carbon battery, paired with rapid 80W wired charging, which guarantees multiple days of usage on a single charge. Photography is handled by a competent 50 MP main camera and a sharp 32 MP front shooter, delivering great shots for social media. Although it officially debuted outside the USA with a launch price of $253, interested users can acquire it via international retailers. The handset brings premium touches like an IP65 water and dust resistance rating, making it a highly durable and long-lasting companion for daily life.",
      verdict: "For USA buyers seeking extreme battery life without sacrificing a premium design, the Vivo Y300 Pro is a fantastic choice. The massive 6,500 mAh battery combined with 80W fast charging puts it ahead of most competitors in its class, virtually eliminating range anxiety. The stunning 120Hz curved AMOLED display offers vibrant colors and exceptional brightness for outdoor viewing. While it relies on the older Snapdragon 6 Gen 1 processor and lacks official US warranty support, the overall hardware package provides excellent value. If you prioritize endurance, a bright screen, and fast charging over top-tier gaming performance, the Y300 Pro makes perfect sense.",
      pros: [
        "Massive 6,500 mAh battery with ultra-fast 80W charging.",
        "Stunning 120Hz AMOLED curved display with 5,000 nits peak brightness.",
        "Durable build with IP65 dust and water resistance.",
        "Capable 50 MP main camera and 32 MP selfie shooter."
      ],
      cons: [
        "No official USA availability or warranty coverage.",
        "Older Snapdragon 6 Gen 1 chipset limits high-end gaming.",
        "Lacks a 3.5mm headphone jack and NFC."
      ],
      faqs: [
        { question: "Does the Vivo Y300 Pro work in the USA?", answer: "Yes, but you must check your carrier's specific 4G and 5G band compatibility, as it is an imported model." },
        { question: "What is the battery capacity of the Vivo Y300 Pro?", answer: "It features an enormous 6,500 mAh Silicon-Carbon battery that supports 80W wired fast charging." },
        { question: "Does the Vivo Y300 Pro have a headphone jack?", answer: "No, the device does not include a 3.5mm headphone jack, requiring wireless or USB-C audio solutions." },
        { question: "Is the Vivo Y300 Pro waterproof?", answer: "It holds an IP65 rating, meaning it is highly resistant to dust and can withstand low-pressure water jets, but it is not fully waterproof." },
        { question: "What processor does the Vivo Y300 Pro use?", answer: "It is powered by the Qualcomm Snapdragon 6 Gen 1 chipset, which is optimized for daily tasks and efficiency." }
      ],
      metaDescription: "Explore the Vivo Y300 Pro featuring a massive 6500 mAh battery, a bright 120Hz AMOLED display, and 80W charging. See full specs and US availability today.",
      updatedAt: new Date()
    };

    const result = await db.collection('phones').updateOne(
      { name: "Vivo Y300 Pro" },
      { $set: phoneData },
      { upsert: true }
    );
    console.log("Successfully upserted Vivo Y300 Pro. UpsertedId:", result.upsertedId, "Modified:", result.modifiedCount);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
