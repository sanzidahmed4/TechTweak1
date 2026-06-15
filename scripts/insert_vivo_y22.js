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
      name: "Vivo Y22",
      slug: "vivo-y22",
      brand: brand._id,
      price_usd: 155,
      seo_overview: "The Vivo Y22 is a highly accessible budget smartphone designed to deliver standard everyday capabilities without breaking the bank for consumers in the USA. Originally released in September 2022, this device features a modest 6.55-inch display that provides adequate brightness and clarity for basic media consumption and daily tasks. It is powered by the MediaTek Helio G85 chipset, an older but proven processor that handles casual gaming and social media browsing reasonably well. A notable highlight of the Vivo Y22 is its dependable 5,000 mAh battery, guaranteeing excellent endurance that easily lasts throughout the entire day. While it is limited to standard 4G connectivity, it still offers robust performance for users who do not prioritize blazing-fast 5G networks. With a highly affordable overseas launch price of approximately $155, the Vivo Y22 appeals heavily to students and light users. Because it was never officially launched in the United States, interested buyers must utilize third-party import services. Despite this, its appealing design, solid battery performance, and up to 128GB of internal storage make it a viable ultra-budget alternative.",
      verdict: "For American consumers hunting for an ultra-cheap smartphone via import channels, the Vivo Y22 is a decent pick. Its 5,000 mAh battery ensures reliable longevity, minimizing trips to the charger. The MediaTek Helio G85 provides sufficient power for casual use, though power users should look elsewhere. Because it is an older 4G-only device with no official US warranty, it comes with inherent risks regarding network band compatibility. However, if your primary goal is finding an inexpensive secondary device or a basic phone for light social media browsing and calls, the Y22 serves its purpose well.",
      pros: [
        "Outstanding battery endurance with the 5,000 mAh capacity.",
        "Highly affordable price point for budget-conscious buyers.",
        "MediaTek Helio G85 handles basic tasks smoothly.",
        "Generous storage configurations up to 128GB."
      ],
      cons: [
        "Limited to 4G connectivity instead of modern 5G.",
        "Must be imported, lacking official US warranty and support.",
        "Older 2022 hardware feels slightly outdated today."
      ],
      faqs: [
        { question: "Does the Vivo Y22 support 5G connectivity?", answer: "No, the device is limited to 4G LTE networks." },
        { question: "What is the battery capacity of the Vivo Y22?", answer: "It is equipped with a large and reliable 5,000 mAh battery." },
        { question: "What processor is used in the Vivo Y22?", answer: "The smartphone runs on the MediaTek Helio G85 chipset." },
        { question: "Is the Vivo Y22 available officially in the USA?", answer: "No, it was never released in the US and must be imported." },
        { question: "How large is the display on the Vivo Y22?", answer: "The phone features a standard 6.55-inch LCD screen." }
      ],
      metaDescription: "Learn about the affordable Vivo Y22 featuring a 6.55-inch display, a reliable 5000 mAh battery, and the Helio G85 processor. See US pricing today.",
      updatedAt: new Date()
    };

    const result = await db.collection('phones').updateOne(
      { name: "Vivo Y22" },
      { $set: phoneData },
      { upsert: true }
    );
    console.log("Successfully upserted Vivo Y22. UpsertedId:", result.upsertedId, "Modified:", result.modifiedCount);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
