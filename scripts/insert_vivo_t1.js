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
      name: "Vivo T1",
      slug: "vivo-t1",
      brand: brand._id,
      price_usd: 200,
      seo_overview: "The Vivo T1 5G stands as a practical and highly affordable smartphone designed to offer standard 5G connectivity and solid everyday functionality. Originally debuting in February 2022, the device brings a robust package that appeals to cost-conscious consumers in the USA looking for international imports. At the front, the phone sports a large 6.58-inch IPS LCD screen boasting a smooth 120Hz refresh rate and a crisp Full HD+ resolution, ensuring that browsing, reading, and video playback feel impressively fluid. Under the hood, the Vivo T1 relies on the reliable Qualcomm Snapdragon 695 5G chipset. This popular mid-range processor effectively balances battery consumption with capable performance, handling social media apps and casual gaming without breaking a sweat. Its 50MP triple-camera setup produces detailed daylight photography, while the 16MP front shooter captures great selfies for sharing online. Powering the entire system is a large 5,000 mAh battery that confidently lasts a full day, although the 18W charging speed requires patience when refilling. Carrying a highly accessible overseas launch price of around $200, the Vivo T1 provides great value with useful extras like a 3.5mm headphone jack and expandable microSD storage.",
      verdict: "For USA buyers seeking an ultra-budget 5G device through the import market, the Vivo T1 5G remains a solid contender. Its 120Hz Full HD+ display and capable Snapdragon 695 chipset easily justify its $200 price point, delivering reliable everyday performance. The 5,000 mAh battery guarantees long-lasting usage. However, the relatively slow 18W charging and lack of official American warranty support are noticeable compromises. Buyers must also ensure their carrier network supports the phone's international bands. If you want a dependable, inexpensive 5G phone and do not mind the limitations of importing, the T1 is highly capable.",
      pros: [
        "Smooth 120Hz IPS LCD screen ensures fluid scrolling and animations.",
        "Qualcomm Snapdragon 695 chipset offers reliable 5G performance.",
        "Dependable 5,000 mAh battery easily lasts an entire day.",
        "Includes a 3.5mm headphone jack and expandable storage."
      ],
      cons: [
        "Outdated 18W charging speed is slow by modern standards.",
        "Lacks an official US launch, requiring a third-party import.",
        "LCD panel colors are less vibrant than competing AMOLED screens."
      ],
      faqs: [
        { question: "Does the Vivo T1 support 5G networks?", answer: "Yes, it comes equipped with 5G connectivity for faster data speeds." },
        { question: "What processor is in the Vivo T1 5G?", answer: "It is powered by the capable Qualcomm Snapdragon 695 chipset." },
        { question: "What is the battery size on the Vivo T1?", answer: "The device houses a long-lasting 5,000 mAh battery." },
        { question: "Does the Vivo T1 have an AMOLED display?", answer: "No, it features a 6.58-inch IPS LCD screen with a 120Hz refresh rate." },
        { question: "Is there a headphone jack on the Vivo T1?", answer: "Yes, it includes a standard 3.5mm headphone jack for wired audio." }
      ],
      metaDescription: "Discover the Vivo T1 5G featuring a smooth 120Hz display, a Snapdragon 695 processor, and a large 5000 mAh battery. See US pricing and full specs.",
      updatedAt: new Date()
    };

    const result = await db.collection('phones').updateOne(
      { name: "Vivo T1" },
      { $set: phoneData },
      { upsert: true }
    );
    console.log("Successfully upserted Vivo T1. UpsertedId:", result.upsertedId, "Modified:", result.modifiedCount);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
