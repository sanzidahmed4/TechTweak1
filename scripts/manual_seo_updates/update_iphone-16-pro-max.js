const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  // WARNING: MUST USE EXACT LOWERCASE SLUG HERE
  const result = await Phone.updateOne({ slug: 'iphone-16-pro-max' }, { $set: {
    seo_overview: `The iPhone 16 Pro Max is Apple's most powerful and feature-rich smartphone, designed for users who demand the absolute best in performance, camera technology, and battery life. Priced at $1,199 in the United States, it represents the pinnacle of what iOS has to offer in 2024.\n\nAt its core is the Apple A18 Pro chip built on a cutting-edge 3nm process with a 6-core CPU, delivering blistering speed for gaming, video editing, and AI-driven tasks. The massive 6.9-inch Super Retina XDR display is the largest ever on an iPhone, offering an immersive viewing experience with ProMotion 120Hz adaptive refresh rate technology.\n\nPhotography takes a giant leap forward with a triple camera system: a 48 MP main sensor with sensor-shift OIS, a 48 MP ultrawide lens, and a 12 MP periscope telephoto with 5x optical zoom — perfect for capturing distant subjects with stunning clarity. The 4685 mAh battery is the biggest Apple has ever put in an iPhone, delivering exceptional all-day stamina that easily stretches into a second day with moderate use.\n\nCharging options include 25W MagSafe and 15W Qi2 wireless, while IP68 water resistance protects the device in up to 6 meters of water for 30 minutes. For USA buyers who want a no-compromise flagship that excels at everything, the iPhone 16 Pro Max is the definitive choice.`,
    verdict: `The iPhone 16 Pro Max is the ultimate iPhone for power users in the USA. The A18 Pro chip handles everything from intensive ProRes video editing to AAA gaming without breaking a sweat. The 5x periscope telephoto is a game-changer for mobile photography, and the 4685 mAh battery delivers the best battery life in iPhone history. At $1,199, it's a significant investment, but you get an unmatched combination of performance, camera versatility, and software longevity. If budget isn't a constraint and you want the best smartphone Apple makes, this is it.`,
    pros: [
      "A18 Pro chip delivers desktop-class performance with exceptional power efficiency",
      "5x optical zoom periscope telephoto — a first-tier camera system for mobile photography",
      "Largest iPhone battery ever (4685 mAh) with outstanding all-day and beyond endurance",
      "6.9-inch display with ProMotion — the most immersive iPhone viewing experience"
    ],
    cons: [
      "Premium $1,199 price tag puts it out of reach for many buyers",
      "No USB-C fast charging brick included in the box",
      "Heavy and large form factor may not suit users who prefer compact phones"
    ],
    faqs: [
      { question: "How much does the iPhone 16 Pro Max cost in the USA?", answer: "The iPhone 16 Pro Max starts at $1,199 in the United States for the base storage configuration. It is available through Apple directly, as well as through carriers like AT&T, T-Mobile, and Verizon, which often offer trade-in deals and installment plans." },
      { question: "Is the iPhone 16 Pro Max worth buying over the iPhone 16 Pro?", answer: "If you prioritize battery life and screen size, the Pro Max is worth the upgrade. Its 4685 mAh battery significantly outlasts the Pro's 3582 mAh cell, and the 6.9-inch display is ideal for media consumption and productivity. Both share the same A18 Pro chip and camera system." },
      { question: "Does the iPhone 16 Pro Max have 5x optical zoom?", answer: "Yes, the iPhone 16 Pro Max features a 12 MP periscope telephoto lens with 5x optical zoom, allowing you to capture sharp, detailed photos of distant subjects without relying on digital zoom." },
      { question: "How good is the iPhone 16 Pro Max battery life?", answer: "The iPhone 16 Pro Max houses a 4685 mAh battery — the largest in any iPhone to date. Combined with the efficient A18 Pro chip, it comfortably delivers all-day battery life and can stretch into a second day with moderate use. It also supports 25W MagSafe wireless charging." },
      { question: "Is the iPhone 16 Pro Max waterproof?", answer: "The iPhone 16 Pro Max has an IP68 rating, making it resistant to dust and water submersion up to 6 meters for 30 minutes. This is among the best water resistance ratings in the smartphone market, surpassing most Android flagships." }
    ],
    meta_title: "iPhone 16 Pro Max Price in USA & Full Specs | Buy or Skip?",
    meta_description: "iPhone 16 Pro Max starts at $1,199 in the USA with A18 Pro chip, 5x zoom, and 4685 mAh battery. See full specs, pros & cons here.",
    manual_seo_done: true
  }});

  console.log(`Updated iphone-16-pro-max, modified: ${result.modifiedCount}`);
  await mongoose.disconnect();
}
run().catch(console.error);
