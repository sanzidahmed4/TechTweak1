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
      name: "Vivo Y200",
      brand: brand._id,
      launchPrice: 217,
      seoOverview: "The Vivo Y200 is an elegantly crafted 5G smartphone that delivers dependable performance and a stunning visual experience for modern consumers. Released in October 2023, the device captures the attention of USA buyers with its gorgeous 6.67-inch AMOLED display, featuring a vibrant 120Hz refresh rate and crisp FHD+ resolution. This makes it an ideal companion for streaming movies, browsing social media, and enjoying lightweight games. Powering the smartphone is the capable Qualcomm Snapdragon 4 Gen 1 processor, ensuring snappy responsiveness for daily multitasking. The camera system is another massive highlight, sporting a high-resolution 64MP primary sensor with Optical Image Stabilization (OIS), which significantly improves low-light photography and reduces blur. Selfie enthusiasts will appreciate the sharp 16MP front camera. Battery anxiety is kept at bay with a reliable 4,800 mAh capacity that supports 44W fast charging, quickly topping up the device. Although it officially debuted outside the US with a launch price of approximately $217, tech-savvy users willing to import the Vivo Y200 will enjoy its premium build, solid Funtouch OS 13 software, and convenient IP54 dust and splash resistance.",
      verdict: "For American buyers looking to import a stylish mid-range device, the Vivo Y200 is a fantastic choice that punches above its weight class. Its 120Hz AMOLED display and OIS-equipped 64MP camera provide a flagship-like feel at a fraction of the cost. The Snapdragon 4 Gen 1 chipset ensures reliable daily performance, and 44W fast charging is incredibly convenient. While importing means sacrificing official US warranty and facing potential carrier band limitations, the sheer value of the hardware makes it worthwhile for budget-conscious users who want premium features like OIS and an AMOLED screen.",
      pros: [
        "Excellent 64MP main camera with Optical Image Stabilization.",
        "Beautiful 120Hz AMOLED display with rich colors.",
        "Fast 44W wired charging for the 4,800 mAh battery.",
        "Elegant design with IP54 dust and splash resistance."
      ],
      cons: [
        "Processor is slightly older compared to newer rivals.",
        "Lacks official availability and warranty in the USA.",
        "No ultra-wide camera lens included."
      ],
      faqs: [
        { question: "Does the Vivo Y200 have Optical Image Stabilization?", answer: "Yes, the 64MP primary camera includes OIS for clearer, blur-free photos and videos." },
        { question: "What processor is inside the Vivo Y200?", answer: "It uses the Qualcomm Snapdragon 4 Gen 1 chipset for efficient daily operations." },
        { question: "Is the Vivo Y200 screen AMOLED or LCD?", answer: "It features a high-quality 6.67-inch AMOLED display with a 120Hz refresh rate." },
        { question: "How fast does the Vivo Y200 charge?", answer: "It supports rapid 44W wired fast charging, ensuring quick battery top-ups." },
        { question: "Does the Vivo Y200 support 5G connectivity?", answer: "Yes, it is a 5G-capable smartphone, though US network compatibility must be checked." }
      ],
      metaDescription: "Discover the Vivo Y200 featuring a 120Hz AMOLED display, a 64MP OIS camera, and rapid 44W charging. See full specs, US availability, and pricing details.",
      updatedAt: new Date()
    };

    const result = await db.collection('phones').updateOne(
      { name: "Vivo Y200" },
      { $set: phoneData },
      { upsert: true }
    );
    console.log("Successfully upserted Vivo Y200. UpsertedId:", result.upsertedId, "Modified:", result.modifiedCount);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
