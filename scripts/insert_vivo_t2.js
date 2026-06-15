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
      name: "Vivo T2",
      slug: "vivo-t2",
      brand: brand._id,
      price_usd: 230,
      seo_overview: "The Vivo T2 5G represents an incredibly strong entry into the competitive mid-range market, providing a rich feature set to savvy USA buyers looking for quality via import channels. Arriving in April 2023, the phone’s centerpiece is a brilliant 6.38-inch AMOLED display. Reaching an ultra-bright peak of 1,300 nits, the screen easily overpowers direct sunlight, ensuring your content is always perfectly visible. Inside the device sits the reliable Qualcomm Snapdragon 695 5G processor, which excels at balancing smooth everyday performance with strict power efficiency. For the aspiring photographer, the Vivo T2 features a robust 64MP primary sensor that is impressively augmented with Optical Image Stabilization (OIS)—a premium feature that dramatically reduces blur in action shots and night photography. Providing power is a 4,500 mAh battery that reliably lasts throughout the workday, and the fast 44W wired charging minimizes downtime. Though it launched abroad with an initial price tag of approximately $230, American consumers can acquire it through third-party importers. The combination of its lightweight design, beautiful screen, and stabilized camera makes it an exceptional choice for anyone seeking flagship nuances on a tight budget.",
      verdict: "USA buyers willing to venture outside their local carrier store will discover massive value in the imported Vivo T2 5G. At its accessible price point, finding an AMOLED display capable of 1,300 nits alongside an OIS-equipped 64MP camera is incredibly rare. The Snapdragon 695 5G chipset guarantees reliable and snappy performance for typical usage, and the fast 44W charging is highly convenient. Understandably, the lack of official American warranty and possible network band restrictions are drawbacks to consider. However, for those who value an elite display and steady photography without paying a premium, the Vivo T2 is a magnificent option.",
      pros: [
        "Extremely bright 6.38-inch AMOLED display hitting 1,300 nits.",
        "Premium 64MP primary camera featuring Optical Image Stabilization.",
        "Power-efficient Snapdragon 695 processor ensures steady performance.",
        "Fast and convenient 44W wired charging."
      ],
      cons: [
        "Must be imported, lacking direct USA customer support.",
        "The 4,500 mAh battery is slightly smaller than current industry standards.",
        "Secondary camera is limited and lacks versatility."
      ],
      faqs: [
        { question: "Does the Vivo T2 have an AMOLED display?", answer: "Yes, it is equipped with a vibrant 6.38-inch AMOLED screen." },
        { question: "What processor is in the Vivo T2?", answer: "It uses the power-efficient Qualcomm Snapdragon 695 5G chipset." },
        { question: "Does the Vivo T2 camera have OIS?", answer: "Yes, the 64MP main camera features Optical Image Stabilization for sharper images." },
        { question: "How fast is the charging on the Vivo T2?", answer: "The device supports fast 44W wired charging for quick battery top-ups." },
        { question: "Is the Vivo T2 officially sold in the US?", answer: "No, the device must be purchased through international third-party importers." }
      ],
      metaDescription: "Explore the Vivo T2 5G featuring a super bright AMOLED display, Snapdragon 695 processor, and a 64MP OIS camera. Discover full specs and US pricing today.",
      updatedAt: new Date()
    };

    const result = await db.collection('phones').updateOne(
      { name: "Vivo T2" },
      { $set: phoneData },
      { upsert: true }
    );
    console.log("Successfully upserted Vivo T2. UpsertedId:", result.upsertedId, "Modified:", result.modifiedCount);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
