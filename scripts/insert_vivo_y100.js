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
      name: "Vivo Y100",
      brand: brand._id,
      launchPrice: 240,
      seoOverview: "The Vivo Y100 brings a fantastic blend of vivid display technology and reliable mid-range performance, making it a compelling option for smart shoppers in the USA. Sporting a bright and colorful 6.38-inch AMOLED display with a 90Hz refresh rate, this device ensures your everyday scrolling and multimedia consumption look absolutely brilliant. Internally, the smartphone is driven by the MediaTek Dimensity 900 chipset, delivering consistent performance for standard tasks and light mobile gaming while maintaining excellent thermal efficiency. Photography is handled gracefully by a 64MP primary rear camera equipped with Optical Image Stabilization (OIS), a rare and welcome feature in this price bracket that significantly improves night shots. The device is powered by a 4,500 mAh battery, which effortlessly supports a full day of typical usage, and when you need a top-up, the included 44W fast charging gets you back in action quickly. Although it carries a launch price of $240 overseas and requires importing to the USA, the Vivo Y100 rewards buyers with a striking color-changing back panel, a robust 5G connection, and a lightweight, ergonomic design that feels incredibly comfortable to hold.",
      verdict: "USA consumers looking to explore beyond mainstream brands will find the Vivo Y100 to be a hidden gem. Its inclusion of an AMOLED display and an OIS-equipped 64MP camera at this price point provides tremendous value. The color-changing back design adds a fun, premium flair usually reserved for more expensive flagship devices. While the 4,500 mAh battery is slightly smaller than the current industry standard, the 44W fast charging easily makes up for it. Potential buyers should consider the lack of official US warranty and possible network band limitations, but if you want standout aesthetics and a solid camera, it is definitely worth importing.",
      pros: [
        "Vibrant 90Hz AMOLED display with excellent brightness.",
        "High-quality 64MP main camera featuring Optical Image Stabilization.",
        "Unique color-changing back panel design.",
        "Fast and convenient 44W wired charging capability."
      ],
      cons: [
        "Battery capacity is slightly smaller than its competitors.",
        "No official customer support or warranty for USA buyers.",
        "Does not include an ultra-wide camera lens."
      ],
      faqs: [
        { question: "Does the Vivo Y100 have Optical Image Stabilization?", answer: "Yes, the 64MP primary camera includes OIS to help capture sharper, blur-free photos." },
        { question: "What processor powers the Vivo Y100?", answer: "The device runs on the highly capable MediaTek Dimensity 900 processor." },
        { question: "Does the Vivo Y100 screen change colors?", answer: "Yes, select color variants feature a special back panel that changes color when exposed to UV light or sunlight." },
        { question: "Is the Vivo Y100 display AMOLED or LCD?", answer: "It features a rich 6.38-inch AMOLED screen with a 90Hz refresh rate." },
        { question: "How fast does the Vivo Y100 battery charge?", answer: "The phone supports 44W fast charging, allowing for quick power top-ups." }
      ],
      metaDescription: "Check out the Vivo Y100 featuring a stunning 90Hz AMOLED display, an OIS-equipped 64MP camera, and a unique color-changing design. See the US pricing.",
      updatedAt: new Date()
    };

    const result = await db.collection('phones').updateOne(
      { name: "Vivo Y100" },
      { $set: phoneData },
      { upsert: true }
    );
    console.log("Successfully upserted Vivo Y100. UpsertedId:", result.upsertedId, "Modified:", result.modifiedCount);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
