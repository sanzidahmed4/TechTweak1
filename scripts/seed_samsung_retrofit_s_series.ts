import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const retrofitData: Record<string, any> = {
  "Samsung Galaxy S24 Ultra": {
    overview: "The Samsung Galaxy S24 Ultra is the pinnacle of Android smartphones in 2024, introducing the groundbreaking 'Galaxy AI' suite that completely transforms how users interact with their device. It features a stunning, flat 6.8-inch Dynamic AMOLED 2X display that is significantly protected by the new Corning Gorilla Armor, dramatically reducing screen reflections. The shift to a premium Titanium frame makes it lighter and more durable than ever before. Powered exclusively by the customized Snapdragon 8 Gen 3 for Galaxy, it offers unparalleled gaming and multitasking performance. The camera system remains industry-leading, replacing the 10x optical zoom with a much higher-resolution 50MP 5x optical zoom lens for sharper, more versatile photography.",
    highlights: ["Groundbreaking Galaxy AI features", "Premium Titanium frame", "Anti-reflective Gorilla Armor screen"],
    pros: ["Flawless Snapdragon 8 Gen 3 performance", "Incredible camera versatility with 50MP 5x zoom", "Built-in S Pen stylus"],
    cons: ["Extremely expensive", "Very large and heavy to hold"],
    verdict: "The ultimate 'everything' phone. If you want the absolute best display, performance, and camera system available on Android, the S24 Ultra is the undisputed king.",
    faq_schema: [
      { question: "Does the Samsung Galaxy S24 Ultra have a flat screen?", answer: "Yes, Samsung has finally moved to a completely flat screen design for the S24 Ultra, which is highly preferred by S Pen users." },
      { question: "Is the S24 Ultra made of Titanium?", answer: "Yes, it features a premium Titanium frame, similar to the iPhone 15 Pro, making it highly durable." },
      { question: "What is the battery life of the S24 Ultra?", answer: "It features a 5000mAh battery that easily provides a full day of heavy usage, making it one of the longest-lasting flagships." },
      { question: "Does the S24 Ultra come with a charger?", answer: "No, like previous generations, the charger must be purchased separately." },
      { question: "What is Galaxy AI on the S24 Ultra?", answer: "Galaxy AI includes features like Live Translate during calls, Note Assist for summarizing text, and Generative Edit for photos." }
    ]
  },
  "Samsung Galaxy S24+": {
    overview: "The Samsung Galaxy S24+ is arguably the sweet spot of the 2024 flagship lineup. It finally bumps the screen resolution back up to a stunning Quad HD+ (1440p) on its gorgeous 6.7-inch Dynamic AMOLED 2X panel, making it just as sharp as the Ultra model. It also received a battery upgrade to 4900mAh, bringing its endurance incredibly close to the top-tier flagship. While it misses out on the Titanium frame and the S Pen, it still packs the powerful Galaxy AI features and the same core processing power. For users who want a massive, brilliant screen without the extreme weight and price of the Ultra, the S24+ is an exceptional choice.",
    highlights: ["Quad HD+ 1440p Display", "Massive 4900mAh Battery", "Galaxy AI integration"],
    pros: ["Screen is incredibly sharp and bright", "Battery life is excellent", "Lighter and more comfortable than the Ultra"],
    cons: ["Cameras are mostly unchanged from the S23+", "Exynos chip in some regions can run warm"],
    verdict: "The most balanced flagship in Samsung's 2024 lineup, offering near-Ultra features at a much more sensible price point.",
    faq_schema: [
      { question: "Does the S24+ have an Exynos or Snapdragon processor?", answer: "It depends on the region. The US and Canada get Snapdragon, while most other global markets, including Bangladesh, get the Exynos 2400." },
      { question: "Is the S24+ screen Quad HD?", answer: "Yes, Samsung upgraded the S24+ to a gorgeous QHD+ display, making it incredibly sharp." },
      { question: "Does the S24+ have Galaxy AI?", answer: "Yes, it supports all the same Galaxy AI features found on the more expensive S24 Ultra." },
      { question: "What is the charging speed of the S24+?", answer: "It supports 45W super-fast wired charging, similar to the Ultra model." },
      { question: "Does the S24+ have a Titanium frame?", answer: "No, it features an Armor Aluminum frame, which is still highly durable but not Titanium." }
    ]
  },
  "Samsung Galaxy S24": {
    overview: "The Samsung Galaxy S24 is the perfect pocket-sized powerhouse. In a market dominated by massive phablets, this compact 6.2-inch flagship is a breath of fresh air. Despite its small size, it boasts an incredibly bright Dynamic AMOLED 2X display with an adaptive 1-120Hz refresh rate. It packs all of Samsung's latest Galaxy AI features, allowing for real-time translation and advanced photo editing right from your pocket. While its 4000mAh battery is smaller than its siblings, it manages power efficiently enough for a full day of light to moderate use. It's the ideal smartphone for users who prioritize ergonomics without sacrificing premium performance.",
    highlights: ["Compact and lightweight design", "Extremely bright 6.2-inch display", "Full Galaxy AI suite"],
    pros: ["One of the best compact phones available", "Display is stunningly bright outdoors", "Premium aluminum build"],
    cons: ["Battery life is average for heavy users", "Charging is limited to 25W", "Exynos version runs slightly warmer"],
    verdict: "The ultimate choice for users who hate large phones. It delivers a true flagship experience in a comfortable, compact form factor.",
    faq_schema: [
      { question: "Is the Samsung Galaxy S24 small?", answer: "Yes, with its 6.2-inch screen and thin bezels, it is one of the most compact premium smartphones on the market." },
      { question: "What processor does the S24 have?", answer: "In Bangladesh and most global markets, it features the Exynos 2400 processor." },
      { question: "Does the S24 have wireless charging?", answer: "Yes, it supports 15W wireless charging and reverse wireless charging." },
      { question: "Is the Galaxy S24 waterproof?", answer: "Yes, it has an IP68 rating, making it highly water and dust resistant." },
      { question: "Does the S24 support 45W charging?", answer: "No, the base S24 is limited to 25W wired fast charging." }
    ]
  },
  "Samsung Galaxy S23 Ultra": {
    overview: "The Samsung Galaxy S23 Ultra was a monumental refinement of the S-series, cementing its status as the ultimate Android smartphone of 2023. Its most significant upgrade was the exclusive, customized Snapdragon 8 Gen 2 for Galaxy processor, which provided unbelievable battery efficiency and sustained gaming performance. It also introduced a massive 200MP primary camera, capturing an astonishing amount of detail and vastly improving nighttime photography. With its built-in S Pen, slightly flatter screen edges for better grip, and legendary 10x optical zoom camera, it remains one of the most capable and versatile smartphones ever created.",
    highlights: ["200MP Main Camera", "Custom Snapdragon 8 Gen 2", "Incredible battery life"],
    pros: ["Flawless performance and thermal management", "The 10x optical zoom is unbeatable", "S Pen integration is flawless"],
    cons: ["Very expensive and heavy", "Design is almost identical to the S22 Ultra"],
    verdict: "A masterpiece of refinement. It fixed every minor flaw of its predecessor to become a near-perfect flagship phone.",
    faq_schema: [
      { question: "Does the S23 Ultra have an Exynos processor?", answer: "No, all S23 Ultra models globally use the highly efficient Snapdragon 8 Gen 2 for Galaxy processor." },
      { question: "How many megapixels is the S23 Ultra camera?", answer: "The main camera is a massive 200 Megapixels, supported by two telephoto lenses and an ultrawide." },
      { question: "Does the S23 Ultra have a built-in stylus?", answer: "Yes, it houses the S Pen internally, just like the Galaxy Note series used to." },
      { question: "What is the optical zoom on the S23 Ultra?", answer: "It features both a 3x optical zoom and a highly unique 10x optical zoom periscope lens." },
      { question: "Is the screen on the S23 Ultra curved?", answer: "Yes, but the curve is noticeably less dramatic than the S22 Ultra, making it easier to hold." }
    ]
  },
  "Samsung Galaxy S23+": {
    overview: "The Samsung Galaxy S23+ is the ultimate 'Goldilocks' phone of 2023—not too small, not too big, but just right. It features a beautiful 6.6-inch Dynamic AMOLED 2X display that is perfect for media consumption. The biggest upgrade for the S23+ was the global inclusion of the Snapdragon 8 Gen 2 for Galaxy processor, completely eliminating the battery and heating issues of past Exynos chips. This made the 4700mAh battery perform phenomenally well, easily lasting a full day of heavy use. With a refined, minimalist camera housing and robust build quality, it is a highly reliable daily driver.",
    highlights: ["Global Snapdragon 8 Gen 2", "Excellent 4700mAh battery life", "Refined minimalist design"],
    pros: ["Incredibly reliable and stable performance", "Great battery endurance", "Perfect screen size for most users"],
    cons: ["Screen is only 1080p, not 1440p", "Cameras are good but not revolutionary"],
    verdict: "A highly dependable, powerful, and beautifully designed flagship that hits the sweet spot for premium buyers.",
    faq_schema: [
      { question: "Does the S23+ have an Exynos chip?", answer: "No, Samsung used the Snapdragon 8 Gen 2 globally for the entire S23 series." },
      { question: "Is the screen on the S23+ Quad HD?", answer: "No, it features a Full HD+ (1080p) display, which helps conserve battery life." },
      { question: "What is the charging speed of the S23+?", answer: "It supports fast 45W wired charging, allowing it to charge very quickly." },
      { question: "Does the S23+ have a telephoto camera?", answer: "Yes, it features a dedicated 3x optical zoom telephoto lens." },
      { question: "Is the S23+ better than the S22+?", answer: "Yes, the upgraded Snapdragon processor makes it significantly faster and much better at battery management." }
    ]
  },
  "Samsung Galaxy S22 Ultra 5G": {
    overview: "The Galaxy S22 Ultra was a historic release because it was the first S-series phone to fully absorb the identity of the discontinued Galaxy Note line. It featured the sharp, boxy design of a Note and importantly, included a built-in S Pen silo. The 6.8-inch Dynamic AMOLED 2X display was astonishingly bright and vibrant. It also retained the incredible 10x optical zoom lens that made it the king of concert photography. However, depending on the region, the Exynos 2200 or Snapdragon 8 Gen 1 processors struggled slightly with thermal management, leading to less-than-ideal battery life under heavy loads.",
    highlights: ["First S-series with built-in S Pen", "Legendary 10x optical zoom", "Stunningly bright display"],
    pros: ["The spiritual successor to the Galaxy Note", "Unbeatable zoom photography", "Gorgeous premium design"],
    cons: ["Battery life can drain quickly under heavy use", "Processor runs quite warm", "Very heavy"],
    verdict: "A historic device that successfully merged the Galaxy S and Note lines, offering incredible features despite some thermal quirks.",
    faq_schema: [
      { question: "Does the S22 Ultra come with an S Pen?", answer: "Yes, it is built directly into the chassis of the phone." },
      { question: "How far can the S22 Ultra zoom?", answer: "It features 10x optical zoom and up to 100x digital 'Space Zoom'." },
      { question: "Is the S22 Ultra good for gaming?", answer: "Yes, but heavy games may cause the phone to heat up and throttle performance faster than the S23 Ultra." },
      { question: "Does it have a MicroSD card slot?", answer: "No, Samsung removed expandable storage from their premium flagships." },
      { question: "What is the battery size of the S22 Ultra?", answer: "It features a large 5000mAh battery." }
    ]
  }
};

const defaultContent = {
  overview: "This is a premium Galaxy S-series device that pushes the boundaries of smartphone technology. It features Samsung's signature Dynamic AMOLED display technology, offering vibrant colors, deep blacks, and a smooth high refresh rate. Powered by top-tier flagship processors, it delivers uncompromising performance for heavy multitasking and intense 3D gaming. The camera system is highly versatile, equipped with advanced low-light processing and professional-grade video recording capabilities. Wrapped in a premium glass and metal build with robust water resistance, it represents the absolute pinnacle of Android hardware.",
  highlights: ["Premium Dynamic AMOLED Display", "Flagship-grade performance", "Advanced versatile camera system"],
  pros: ["Stunning display quality", "Excellent premium build", "Highly capable cameras"],
  cons: ["High flagship price tag", "No expandable storage"],
  verdict: "A superb premium smartphone that delivers a top-tier Android experience without compromises.",
  faq_schema: [
    { question: "Is this Samsung phone good for gaming?", answer: "Yes, as a premium S-series device, it features flagship processors that can handle the heaviest games smoothly." },
    { question: "Does this phone support wireless charging?", answer: "Yes, all modern Galaxy S-series phones support fast wireless charging." },
    { question: "Is the phone waterproof?", answer: "Yes, it comes with a high IP68 rating for excellent dust and water resistance." },
    { question: "Does it come with a charger in the box?", answer: "No, Samsung no longer includes charging bricks in the box for their premium phones." },
    { question: "Does it have a headphone jack?", answer: "No, the 3.5mm headphone jack was removed from the S-series years ago." }
  ]
};

async function run() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected to MongoDB");

    const Brand = mongoose.models.Brand || mongoose.model("Brand", new mongoose.Schema({}, { strict: false }));
    const samsungBrand = await Brand.findOne({ name: /Samsung/i });
    const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));

    const phonesToUpdate = await Phone.find({ 
      brand_id: samsungBrand._id, 
      name: /Galaxy S/i 
    }).select('name slug overview');

    let updatedCount = 0;

    for (const phone of phonesToUpdate) {
      if (!phone.overview || phone.overview.length < 50) {
        const content = retrofitData[phone.name] || defaultContent;
        
        await Phone.updateOne(
          { _id: phone._id },
          { 
            $set: {
              overview: content.overview,
              highlights: content.highlights,
              pros: content.pros,
              cons: content.cons,
              verdict: content.verdict,
              faq_schema: content.faq_schema,
              updated_at: new Date()
            }
          }
        );
        console.log(`✅ Retrofitted SEO content for: ${phone.name}`);
        updatedCount++;
      }
    }

    console.log(`🎉 Retrofit complete! Updated ${updatedCount} original S-Series phones.`);

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
