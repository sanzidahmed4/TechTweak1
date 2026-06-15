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
      name: "Vivo T2 Pro",
      slug: "vivo-t2-pro",
      brand: brand._id,
      price_usd: 280,
      seo_overview: "The Vivo T2 Pro 5G is a sleek, performance-driven mid-range smartphone that blends flagship-level aesthetics with seriously impressive internal hardware. Making its debut in September 2023, the handset appeals to design-conscious USA consumers thanks to its ultra-slim 7.4mm profile and gorgeous 6.78-inch curved AMOLED display. The 120Hz refresh rate ensures that scrolling and gaming feel incredibly fluid and responsive. Under the hood, Vivo has equipped the T2 Pro with the formidable MediaTek Dimensity 7200 chipset, allowing the device to slice through heavy applications and mobile gaming with remarkable ease. Photography is handled by a 64MP primary sensor that boasts both Optical and Electronic Image Stabilization (OIS and EIS), paired with a unique circular \"Aura Light\" flash that produces studio-quality portraits in dim lighting. To keep the phone running securely, it packs a 4,600 mAh battery supported by a rapid 66W fast charger. Although the device is technically a rebadged version of the iQOO Z7 Pro and features an overseas launch price of roughly $280, it remains a fantastic option for those who choose to import it, offering high-end design, an IP52 rating, and exceptional value.",
      verdict: "For American tech fans looking to import a stylish and capable mid-range phone, the Vivo T2 Pro 5G is an exceptional catch. The curved AMOLED display and incredibly slim profile give it a premium feel that rivals devices twice its price. The Dimensity 7200 processor easily handles intensive tasks, while the OIS-enabled 64MP camera with the Aura Light flash creates fantastic low-light portraits. However, potential buyers must consider the lack of official US availability and warranty, alongside the missing NFC chip and ultra-wide camera lens. If those drawbacks don't deter you, the T2 Pro is a beautifully crafted powerhouse for the price.",
      pros: [
        "Striking, ultra-slim design with a 120Hz curved AMOLED display.",
        "High-performance MediaTek Dimensity 7200 chipset.",
        "Capable 64MP primary camera featuring OIS and an Aura Light flash.",
        "Fast 66W wired charging capability."
      ],
      cons: [
        "Requires importation and lacks official US customer support.",
        "Does not include an NFC chip for contactless payments.",
        "No ultra-wide camera available."
      ],
      faqs: [
        { question: "Does the Vivo T2 Pro have an AMOLED display?", answer: "Yes, it features a beautiful 6.78-inch curved AMOLED screen with a 120Hz refresh rate." },
        { question: "What processor is inside the Vivo T2 Pro 5G?", answer: "The device is powered by the fast and capable MediaTek Dimensity 7200 chipset." },
        { question: "Does the Vivo T2 Pro feature Optical Image Stabilization?", answer: "Yes, the 64MP primary camera utilizes OIS for clearer, blur-free photos." },
        { question: "Does the Vivo T2 Pro have NFC?", answer: "No, the smartphone does not include an NFC chip for mobile payments." },
        { question: "How fast does the Vivo T2 Pro charge?", answer: "It supports very fast 66W wired charging to quickly power its 4,600 mAh battery." }
      ],
      metaDescription: "Discover the Vivo T2 Pro 5G featuring a curved AMOLED display, Dimensity 7200 processor, and a 64MP OIS camera with Aura Light. Check US pricing today.",
      updatedAt: new Date()
    };

    const result = await db.collection('phones').updateOne(
      { name: "Vivo T2 Pro" },
      { $set: phoneData },
      { upsert: true }
    );
    console.log("Successfully upserted Vivo T2 Pro. UpsertedId:", result.upsertedId, "Modified:", result.modifiedCount);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
