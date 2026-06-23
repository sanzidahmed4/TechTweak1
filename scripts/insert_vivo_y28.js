require('dotenv').config({ path: '.env.local' });
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
      name: "Vivo Y28",
      slug: "vivo-y28",
      brand: brand._id,
      price_usd: 150,
      seo_overview: "The Vivo Y28 5G is an attractive entry-level smartphone designed to offer essential features and reliable 5G connectivity without emptying your wallet. Aimed at budget-conscious consumers, this device pairs a sleek, modern design with the dependable performance of the MediaTek Dimensity 6020 chipset. This combination ensures that casual browsing, light gaming, and everyday multitasking remain incredibly smooth and responsive. On the rear, the handset features a 50MP primary camera that takes vibrant, clear photos during the day, accompanied by an 8MP selfie shooter for crisp video calls. For users prioritizing longevity, the phone houses a solid 5,000 mAh battery that easily pushes through a full day of mixed usage. Though it charges at a modest 15W rate, the power efficiency of the 7nm processor helps maximize every percentage point of battery life. While it carries an overseas launch price of approximately $150, interested USA buyers will need to acquire the Vivo Y28 via third-party importers. It stands out as a highly practical choice for students or anyone seeking an affordable gateway into 5G network speeds and capable daily performance.",
      verdict: "For USA shoppers seeking a no-nonsense budget device, the Vivo Y28 5G presents a strong value proposition through importation. The inclusion of a Dimensity 6020 processor ensures stable daily functionality, while the 5,000 mAh battery guarantees you won't be tethered to a charger. The 50MP main camera easily outpaces many competitors in the ultra-budget category. Its 15W charging speed is undeniably slow by modern standards, and the lack of official US support means buyers must double-check carrier compatibility. Still, if you desire a sleek, inexpensive 5G phone that handles everyday tasks with ease, the Vivo Y28 is a worthy candidate.",
      pros: [
        "Excellent value for money with a reliable MediaTek Dimensity 6020 processor.",
        "Long-lasting 5,000 mAh battery for all-day usage.",
        "Solid 50MP primary camera captures bright daylight photos.",
        "Clean and modern aesthetic for a budget smartphone."
      ],
      cons: [
        "Sluggish 15W wired charging speed.",
        "Not officially released in the US, requiring importation.",
        "Limited secondary camera versatility."
      ],
      faqs: [
        { question: "Does the Vivo Y28 support 5G networks?", answer: "Yes, it is fully equipped with 5G connectivity for faster download and browsing speeds." },
        { question: "What is the battery size of the Vivo Y28 5G?", answer: "The device is powered by a dependable 5,000 mAh battery." },
        { question: "How fast does the Vivo Y28 charge?", answer: "It supports standard 15W wired charging, which is slower than premium models." },
        { question: "What processor is inside the Vivo Y28?", answer: "It operates on the MediaTek Dimensity 6020 chipset, built on an efficient 7nm process." },
        { question: "How many megapixels is the main camera?", answer: "The rear camera system features a sharp 50MP primary lens." }
      ],
      metaDescription: "Check out the affordable Vivo Y28 5G featuring a dependable Dimensity 6020 processor, a 50MP camera, and a 5000 mAh battery. See US pricing and full specs.",
      updatedAt: new Date()
    };

    const result = await db.collection('phones').updateOne(
      { name: "Vivo Y28" },
      { $set: phoneData },
      { upsert: true }
    );
    console.log("Successfully upserted Vivo Y28. UpsertedId:", result.upsertedId, "Modified:", result.modifiedCount);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
