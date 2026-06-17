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
      name: "Vivo Y300",
      slug: "vivo-y300",
      brand: brand._id,
      price_usd: 215,
      seo_overview: "The Vivo Y300 is a sleek, budget-friendly 5G smartphone that delivers dependable performance for consumers in the USA looking for a solid daily driver. Announced in November 2024, the device is built around a vibrant 6.67-inch display, offering a clear and immersive viewing experience for movies and social media. Under the hood, the phone is powered by the capable Snapdragon 4 Gen 2 processor, providing excellent efficiency and smooth 5G connectivity for standard usage. One of the strongest selling points for buyers is its robust 5000 mAh battery, which guarantees all-day reliability without constantly hunting for a charger. The camera system features a crisp 50 MP main sensor, capturing bright, detailed photos in most lighting conditions. With up to 256 GB of internal storage and 8 GB of RAM, you get plenty of space for apps, photos, and smooth multitasking. While the Vivo Y300 is an international model with a launch price of approximately $215, importing it brings exceptional value to American users who prioritize battery life, modern aesthetics, and a sharp display over flagship-tier processing power.",
      verdict: "American buyers searching for an affordable, highly capable 5G device will find excellent value in the Vivo Y300. With its impressive 5000 mAh battery, the phone easily handles a full day of heavy usage. The Snapdragon 4 Gen 2 chipset offers snappy daily performance, and the 6.67-inch screen is fantastic for multimedia consumption. While it lacks official USA carrier support and warranty, those willing to import it are rewarded with a beautifully designed smartphone. The 50 MP camera performs admirably for the price bracket, making it a wonderful option for budget-conscious consumers seeking modern features without paying premium prices.",
      pros: [
        "Long-lasting 5000 mAh battery capacity for all-day usage.",
        "Smooth everyday performance with the Snapdragon 4 Gen 2 chipset.",
        "Generous memory configurations with up to 8GB RAM and 256GB storage.",
        "Crisp and detailed photos from the 50 MP main camera."
      ],
      cons: [
        "Limited compatibility with USA 5G and 4G carrier bands.",
        "No official local warranty support for American buyers."
      ],
      faqs: [
        { question: "Does the Vivo Y300 support 5G in the USA?", answer: "It supports 5G, but you must verify compatibility with your specific American carrier's network bands." },
        { question: "What processor does the Vivo Y300 feature?", answer: "It is equipped with the highly efficient Qualcomm Snapdragon 4 Gen 2 chipset." },
        { question: "How much storage does the Vivo Y300 have?", answer: "The device offers configurations with up to 256 GB of internal storage." },
        { question: "What is the battery size on the Vivo Y300?", answer: "It features a large 5000 mAh battery designed to provide all-day power." },
        { question: "How many megapixels is the Vivo Y300 camera?", answer: "The primary rear camera is equipped with a 50 MP sensor for high-resolution photography." }
      ],
      metaDescription: "Discover the Vivo Y300 featuring a beautiful 6.67-inch screen, reliable Snapdragon 4 Gen 2 processor, and 5000 mAh battery. See full specs and USA pricing.",
      updatedAt: new Date()
    };

    const result = await db.collection('phones').updateOne(
      { name: "Vivo Y300" },
      { $set: phoneData },
      { upsert: true }
    );
    console.log("Successfully upserted Vivo Y300. UpsertedId:", result.upsertedId, "Modified:", result.modifiedCount);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
