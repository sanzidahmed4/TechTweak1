const { MongoClient } = require('mongodb');

const uri = "mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('techtweak');
    
    const brand = await db.collection('brands').findOne({ name: { $regex: /^vivo$/i } });
    if (!brand) throw new Error("Vivo brand not found");

    const phoneData = {
      name: "Vivo Y58",
      slug: "vivo-y58",
      brand: brand._id,
      price_usd: 205,
      seo_overview: "The Vivo Y58 5G is an exceptional budget-friendly smartphone designed to deliver incredible battery life and smooth daily performance for tech enthusiasts in the USA. Officially unveiled in June 2024, the device is built around a large 6.72-inch IPS LCD panel with a crisp FHD+ resolution and a rapid 120Hz refresh rate, ensuring that scrolling through social media and watching videos feels seamless. Powering this handset is the highly efficient Qualcomm Snapdragon 4 Gen 2 chipset, which brings reliable 5G connectivity and fast processing for everyday applications. The true highlight of the Vivo Y58 is its massive 6,000 mAh battery, guaranteeing multiday usage without reaching for the charger. When it is time to recharge, the 44W fast charging capability brings the battery back to life quickly. Photography is handled by a capable 50MP primary rear camera that snaps sharp, detailed photos, while the 8MP front lens is perfect for quick selfies. Although the device must be imported to the USA with an overseas launch price of approximately $205, it provides massive value with extras like a 3.5mm headphone jack, expandable microSD storage, and an IP64 dust and water resistance rating.",
      verdict: "For American consumers looking for a durable, long-lasting smartphone on a budget, the Vivo Y58 5G is a brilliant import choice. The combination of a massive 6,000 mAh battery and a power-efficient Snapdragon 4 Gen 2 processor means you can easily achieve two days of use on a single charge. The inclusion of a 120Hz display at this price point adds a premium feel to everyday interactions. While importing the device means forgoing official US warranty coverage and missing out on some carrier bands, the inclusion of classic features like a 3.5mm headphone jack and microSD slot makes it highly appealing for practical users.",
      pros: [
        "Massive 6,000 mAh battery for multiday endurance.",
        "Smooth 120Hz FHD+ display for an excellent viewing experience.",
        "Convenient inclusion of a 3.5mm headphone jack and microSD slot.",
        "IP64 rating for reliable dust and water resistance."
      ],
      cons: [
        "Uses an IPS LCD panel instead of an AMOLED screen.",
        "Lacks official US market availability and customer support.",
        "The 8MP selfie camera is fairly basic."
      ],
      faqs: [
        { question: "Does the Vivo Y58 have a headphone jack?", answer: "Yes, it includes a classic 3.5mm headphone jack for wired audio connections." },
        { question: "What is the battery capacity of the Vivo Y58?", answer: "It features an enormous 6,000 mAh battery that supports 44W fast charging." },
        { question: "Is the Vivo Y58 waterproof?", answer: "It holds an IP64 rating, meaning it is highly resistant to dust and can survive light water splashes." },
        { question: "Can I expand the storage on the Vivo Y58?", answer: "Yes, it includes a microSD card slot for easily expanding your internal storage." },
        { question: "What processor does the Vivo Y58 use?", answer: "The device is powered by the efficient Qualcomm Snapdragon 4 Gen 2 chipset." }
      ],
      metaDescription: "Explore the Vivo Y58 5G featuring a massive 6000 mAh battery, a 120Hz display, and a 50MP camera. Check out full specifications and US pricing details now.",
      updatedAt: new Date()
    };

    const result = await db.collection('phones').updateOne(
      { name: "Vivo Y58" },
      { $set: phoneData },
      { upsert: true }
    );
    console.log("Successfully upserted Vivo Y58. UpsertedId:", result.upsertedId, "Modified:", result.modifiedCount);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
