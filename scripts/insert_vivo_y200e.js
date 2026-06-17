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
      name: "Vivo Y200e",
      slug: "vivo-y200e",
      brand: brand._id,
      price_usd: 245,
      seo_overview: "The Vivo Y200e 5G brings an intriguing combination of style and practicality to the mid-range smartphone market, capturing the attention of USA buyers looking for unique designs. Unveiled in February 2024, this handset features an impressive 6.67-inch Full HD+ AMOLED display paired with a rapid 120Hz refresh rate, ensuring scrolling and media viewing are buttery smooth. Under the hood, it utilizes the reliable Qualcomm Snapdragon 4 Gen 2 chipset, making it a capable companion for daily tasks and moderate gaming. The device sets itself apart visually with its \"Saffron Delight\" color variant, which boasts a durable eco-fiber leather finish that feels premium in the hand. Photography enthusiasts will appreciate the versatile triple rear camera setup, highlighted by a sharp 50MP primary lens. Staying powered throughout the day is effortless thanks to the generous 5,000 mAh battery, which supports fast 44W wired charging. While its launch price translates to around $245, buyers must import the device as it lacks an official US release. Nonetheless, its IP54 dust and water resistance, coupled with modern 5G capabilities, makes it a highly attractive option for tech-savvy individuals.",
      verdict: "For USA consumers who prioritize aesthetic appeal alongside solid hardware, the Vivo Y200e 5G is a compelling import choice. The eco-fiber leather back provides a distinctive look rarely found in this price bracket, while the 120Hz AMOLED screen ensures a premium viewing experience. Its 5,000 mAh battery with 44W charging offers outstanding endurance for busy days. Although the lack of comprehensive US warranty and missing carrier network bands might deter some, the device remains an excellent budget-friendly alternative. If you want a stylish, long-lasting smartphone and don't mind navigating the import process, the Vivo Y200e stands out brilliantly.",
      pros: [
        "Striking design featuring an eco-fiber leather back option.",
        "Vibrant 120Hz AMOLED display for smooth interactions.",
        "Dependable 5,000 mAh battery combined with 44W fast charging.",
        "Solid 50MP primary camera for clear everyday photography."
      ],
      cons: [
        "No official release or customer support in the USA.",
        "Lacks an ultra-wide camera lens.",
        "Compatibility with US cellular bands may be limited."
      ],
      faqs: [
        { question: "Does the Vivo Y200e 5G have a fingerprint scanner?", answer: "Yes, it includes a convenient and fast in-display fingerprint scanner for security." },
        { question: "Is the Vivo Y200e 5G waterproof?", answer: "It has an IP54 rating, meaning it is protected against dust and light water splashes, but it is not completely waterproof." },
        { question: "What is the charging speed of the Vivo Y200e 5G?", answer: "The device supports rapid 44W wired fast charging to quickly replenish its 5000 mAh battery." },
        { question: "Does the Vivo Y200e support expandable storage?", answer: "Yes, it supports microSD cards up to 1TB to expand your storage capacity." },
        { question: "What processor runs inside the Vivo Y200e?", answer: "It is powered by the highly efficient Qualcomm Snapdragon 4 Gen 2 processor." }
      ],
      metaDescription: "Discover the Vivo Y200e 5G featuring a unique eco-fiber leather design, 120Hz AMOLED display, and a 5000 mAh battery. Check USA pricing and full specs.",
      updatedAt: new Date()
    };

    const result = await db.collection('phones').updateOne(
      { name: "Vivo Y200e" },
      { $set: phoneData },
      { upsert: true }
    );
    console.log("Successfully upserted Vivo Y200e. UpsertedId:", result.upsertedId, "Modified:", result.modifiedCount);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
