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
      name: "Vivo T3",
      slug: "vivo-t3",
      brand: brand._id,
      price_usd: 250,
      seo_overview: "The Vivo T3 5G is a stellar mid-range smartphone that prioritizes visual brilliance and reliable performance for everyday use. Released in March 2024, the handset caters to budget-conscious tech lovers with its beautiful 6.67-inch AMOLED display. Boasting a buttery smooth 120Hz refresh rate and an impressive 1800 nits of peak brightness, the screen is highly readable outdoors and ideal for cinematic media consumption. Driving the device is the highly efficient MediaTek Dimensity 7200 processor, delivering snappy app launches and fluid navigation through Funtouch 14. Mobile photographers will absolutely love the premium 50MP Sony IMX882 main sensor equipped with Optical Image Stabilization (OIS), an addition that drastically reduces camera shake and enhances low-light captures. The phone stays alive via a dependable 5,000 mAh battery, and the 44W FlashCharge support means you spend less time tethered to the wall. At a launch price of $250, the Vivo T3 requires American buyers to seek out import options, as it lacks a formal USA release. Nonetheless, its sleek design, IP54 dust and splash resistance, and high-quality dual stereo speakers make it an incredible value for anyone willing to step outside traditional carrier stores.",
      verdict: "For USA consumers exploring the international market, the Vivo T3 5G is a tremendously compelling buy. Finding a bright 120Hz AMOLED display and an OIS-assisted Sony IMX882 camera at the $250 price point is remarkably rare. The Dimensity 7200 easily handles demanding apps and moderate gaming, while the 5,000 mAh battery ensures all-day endurance. While importing means skipping official warranty support and dealing with potentially limited carrier band compatibility, the pure hardware value is undeniable. If you desire a gorgeous screen and flagship-tier main camera performance on a tight budget, the Vivo T3 is an outstanding choice.",
      pros: [
        "Striking 120Hz AMOLED display with 1800 nits peak brightness.",
        "Fantastic 50MP Sony IMX882 camera with Optical Image Stabilization.",
        "MediaTek Dimensity 7200 processor delivers smooth daily operations.",
        "Reliable 5,000 mAh battery with fast 44W charging."
      ],
      cons: [
        "Not officially available in the USA, requiring third-party importation.",
        "Lacks a 3.5mm headphone jack.",
        "The secondary 2MP depth camera adds little value."
      ],
      faqs: [
        { question: "Does the Vivo T3 have an AMOLED screen?", answer: "Yes, it features a vibrant 6.67-inch AMOLED display with a 120Hz refresh rate." },
        { question: "What processor is inside the Vivo T3 5G?", answer: "The device is powered by the fast and efficient MediaTek Dimensity 7200 chipset." },
        { question: "Does the Vivo T3 feature Optical Image Stabilization?", answer: "Yes, the 50MP primary camera includes OIS for sharper, blur-free photos." },
        { question: "Is the Vivo T3 waterproof?", answer: "It holds an IP54 rating, meaning it is protected against dust and light water splashes." },
        { question: "Does the Vivo T3 have stereo speakers?", answer: "Yes, it includes dual stereo speakers for an immersive audio experience." }
      ],
      metaDescription: "Check out the Vivo T3 5G featuring a 120Hz AMOLED display, Dimensity 7200 processor, and 50MP OIS camera. Explore full specifications and US pricing.",
      updatedAt: new Date()
    };

    const result = await db.collection('phones').updateOne(
      { name: "Vivo T3" },
      { $set: phoneData },
      { upsert: true }
    );
    console.log("Successfully upserted Vivo T3. UpsertedId:", result.upsertedId, "Modified:", result.modifiedCount);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
