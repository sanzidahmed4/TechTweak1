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
      name: "Vivo T3 Pro",
      slug: "vivo-t3-pro",
      brand: brand._id,
      price_usd: 300,
      seo_overview: "The Vivo T3 Pro is a masterclass in mid-range smartphone design, offering an exquisite mix of style and immense power to USA buyers willing to explore international variants. Launched in August 2024, the device immediately captivates with its gorgeous 6.77-inch curved AMOLED display, which features a silky 120Hz refresh rate and a blindingly bright 4,500-nit peak brightness. This makes it an absolute joy to use outdoors in direct sunlight. Powering the smartphone is the formidable Qualcomm Snapdragon 7 Gen 3 processor, delivering flagship-adjacent speeds for multitasking, heavy gaming, and seamless daily operation. For photography, the T3 Pro features an advanced 50MP Sony IMX882 primary sensor with Optical Image Stabilization, ensuring stunningly sharp photos in varied lighting conditions, while an 8MP ultrawide lens expands your framing possibilities. The massive 5,500 mAh battery keeps the phone running effortlessly for up to two days, and the impressive 80W wired charging capability means you are never tethered to an outlet for long. Retailing internationally at a launch price of $300, the Vivo T3 Pro stands out with its premium vegan leather Sandstone Orange finish, an IP64 rating, and responsive under-display fingerprint security.",
      verdict: "For USA tech enthusiasts eager to import a high-performance device, the Vivo T3 Pro is a phenomenal purchase. The combination of the powerful Snapdragon 7 Gen 3 processor and the ultra-bright 4,500-nit AMOLED screen gives it a distinct flagship feel at a fraction of the cost. The massive 5,500 mAh battery paired with lightning-fast 80W charging ensures exceptional reliability for heavy users. Although the lack of an official US warranty and potential limitations on certain 5G network bands must be considered, the stunning vegan leather design and remarkable Sony-powered camera make the T3 Pro a top-tier choice for the budget-savvy.",
      pros: [
        "Extremely bright 4,500-nit curved AMOLED display.",
        "Powerful and efficient Snapdragon 7 Gen 3 processor.",
        "Massive 5,500 mAh battery with rapid 80W charging.",
        "Premium aesthetics featuring a vegan leather back option."
      ],
      cons: [
        "Not officially sold in the USA, requiring third-party importing.",
        "Missing local warranty support for American buyers.",
        "Only an 8MP ultrawide camera, which is fairly standard."
      ],
      faqs: [
        { question: "Does the Vivo T3 Pro have a curved screen?", answer: "Yes, it features a beautiful 6.77-inch curved AMOLED display." },
        { question: "What processor runs the Vivo T3 Pro?", answer: "It is powered by the high-performance Qualcomm Snapdragon 7 Gen 3 chipset." },
        { question: "How fast is the charging on the Vivo T3 Pro?", answer: "The device supports extremely fast 80W wired charging to quickly replenish the 5,500 mAh battery." },
        { question: "Does the Vivo T3 Pro have a leather back?", answer: "The Sandstone Orange color variant features a premium vegan leather back." },
        { question: "Is the Vivo T3 Pro waterproof?", answer: "It holds an IP64 rating, protecting it against dust and light water splashes, but it is not completely waterproof." }
      ],
      metaDescription: "Explore the Vivo T3 Pro featuring a brilliant 4500-nit AMOLED display, Snapdragon 7 Gen 3 processor, and 80W charging. Check full specs and US pricing.",
      updatedAt: new Date()
    };

    const result = await db.collection('phones').updateOne(
      { name: "Vivo T3 Pro" },
      { $set: phoneData },
      { upsert: true }
    );
    console.log("Successfully upserted Vivo T3 Pro. UpsertedId:", result.upsertedId, "Modified:", result.modifiedCount);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
