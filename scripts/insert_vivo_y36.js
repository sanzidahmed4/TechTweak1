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
      name: "Vivo Y36",
      slug: "vivo-y36",
      brand: brand._id,
      price_usd: 210,
      seo_overview: "The Vivo Y36 5G is an affordable, well-rounded smartphone designed to deliver excellent battery life and capable daily performance for consumers in the USA looking for reliable tech on a budget. Announced in May 2023, this handset features a beautiful 6.64-inch IPS LCD panel equipped with a 90Hz refresh rate, providing smooth scrolling and an enjoyable media consumption experience. Underneath its glass front and durable plastic frame, the phone relies on the efficient MediaTek Dimensity 6020 chipset to handle web browsing, social media, and multitasking with ease. Photography is driven by a solid 50MP primary rear camera that captures sharp, colorful daylight shots, paired with a 16MP front-facing lens for clear video calls. One of the primary selling points of the Vivo Y36 is its dependable 5,000 mAh battery, which guarantees full-day endurance. When you do need to plug in, the 44W fast charging system rapidly replenishes the battery. Although its overseas launch price of around $210 means American buyers must purchase it through third-party importers, the device brings great value with IP54 dust and splash resistance, generous 256GB internal storage, and a classic 3.5mm headphone jack.",
      verdict: "For USA buyers seeking an affordable 5G option via the import market, the Vivo Y36 5G stands as a practical and enduring choice. The inclusion of a 5,000 mAh battery with 44W fast charging offers fantastic convenience for users constantly on the move. Its 90Hz display ensures a modern, smooth feel, while the 256GB of storage provides ample space for apps and media. Naturally, importing means sacrificing local warranty support and dealing with potential network band restrictions. However, if you want a reliable daily driver with an excellent primary camera and plenty of storage, the Y36 is a superb ultra-budget candidate.",
      pros: [
        "Massive 256GB of internal storage for plenty of apps and media.",
        "Large 5,000 mAh battery paired with fast 44W charging.",
        "Smooth 90Hz display enhances everyday interactions.",
        "IP54 dust and splash resistance adds everyday durability."
      ],
      cons: [
        "Lacks official US release and customer support.",
        "LCD panel instead of the richer AMOLED technology.",
        "No ultra-wide secondary camera."
      ],
      faqs: [
        { question: "Does the Vivo Y36 support fast charging?", answer: "Yes, it supports rapid 44W wired fast charging to quickly refill its 5,000 mAh battery." },
        { question: "Is the Vivo Y36 screen AMOLED?", answer: "No, the device features a 6.64-inch IPS LCD panel with a 90Hz refresh rate." },
        { question: "What processor is used in the Vivo Y36 5G?", answer: "It is powered by the MediaTek Dimensity 6020 processor." },
        { question: "Does the Vivo Y36 have a headphone jack?", answer: "Yes, it includes a traditional 3.5mm headphone jack for wired audio." },
        { question: "How much storage does the Vivo Y36 offer?", answer: "It comes with a generous 256GB of internal storage." }
      ],
      metaDescription: "Discover the Vivo Y36 5G featuring a 90Hz display, a 50MP camera, and a 5000 mAh battery with 44W charging. See full specs and US pricing details.",
      updatedAt: new Date()
    };

    const result = await db.collection('phones').updateOne(
      { name: "Vivo Y36" },
      { $set: phoneData },
      { upsert: true }
    );
    console.log("Successfully upserted Vivo Y36. UpsertedId:", result.upsertedId, "Modified:", result.modifiedCount);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
