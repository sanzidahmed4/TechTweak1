const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  // WARNING: MUST USE EXACT LOWERCASE SLUG HERE
  const result = await Phone.updateOne({ slug: 'google-pixel-10-pro-xl' }, { $set: {
    seo_overview: `The Google Pixel 10 Pro XL is the biggest and most capable smartphone in Google's 2026 Pixel lineup, designed for enthusiasts who demand the best in computational photography, AI-powered features, and raw performance. Priced at $1,199 in the USA, it goes head-to-head with the Samsung Galaxy S26 Ultra and iPhone 17 Pro Max.

At its core is Google's custom octa-core Tensor G5 chip, purpose-built for on-device AI tasks like real-time photo enhancement, voice transcription, and intelligent assistant features that no other processor can match. The expansive 6.8-inch display delivers vibrant colors and sharp detail, making it perfect for streaming, productivity, and mobile gaming.

The Pixel 10 Pro XL's triple camera system is a photographer's dream. The 50 MP main sensor with f/1.7 aperture and OIS captures stunning photos in any lighting condition, while the 48 MP telephoto brings distant subjects into razor-sharp focus. The 48 MP ultrawide lens rounds out the setup, ensuring you never miss a wide-angle shot. Google's legendary computational photography magic elevates every image with best-in-class HDR, Night Sight, and AI-powered editing tools.

A robust 5,060 mAh battery keeps the phone running all day, and 25W Qi2 wireless charging offers fast, convenient top-ups. With IP68 dust and water resistance, this phone is built to handle real-world conditions with confidence.`,
    verdict: `The Google Pixel 10 Pro XL is the ultimate Pixel for buyers who want the largest screen, the best camera, and the most powerful AI features Google has to offer. At $1,199, it's competitively priced against rival flagships, and the Tensor G5 chip gives it unique advantages in photo processing and on-device AI. The 48 MP telephoto, 25W Qi2 wireless charging, and massive 5,060 mAh battery make it a complete package. If you value camera quality and the pure Android experience above all else, this is the best phone Google has ever made.`,
    pros: [
      "Tensor G5 delivers unmatched on-device AI and computational photography capabilities",
      "Triple camera system with 48 MP telephoto produces best-in-class photos",
      "5,060 mAh battery with 25W Qi2 wireless charging ensures all-day endurance",
      "6.8-inch display is perfect for media, productivity, and gaming"
    ],
    cons: [
      "$1,199 price puts it in direct competition with other premium flagships",
      "No 3.5mm headphone jack",
      "Tensor G5 may trail Snapdragon and Apple silicon in raw benchmark performance"
    ],
    faqs: [
      { question: "How much does the Google Pixel 10 Pro XL cost in the USA?", answer: "The Google Pixel 10 Pro XL is priced at $1,199 in the USA, making it Google's most premium smartphone offering for 2026." },
      { question: "What processor does the Google Pixel 10 Pro XL use?", answer: "It runs on Google's custom octa-core Tensor G5 chip, designed specifically for advanced AI tasks, computational photography, and efficient on-device processing." },
      { question: "Does the Google Pixel 10 Pro XL support wireless charging?", answer: "Yes, it supports 25W Qi2 wireless charging for fast and convenient cable-free charging, along with reverse wireless charging for accessories." },
      { question: "Is the Google Pixel 10 Pro XL waterproof?", answer: "It has an IP68 rating, meaning it is resistant to dust and can withstand submersion in water. It's designed to handle rain, splashes, and accidental drops in water." },
      { question: "How does the Pixel 10 Pro XL camera compare to the iPhone 17 Pro Max?", answer: "The Pixel 10 Pro XL features a 50 MP main + 48 MP telephoto + 48 MP ultrawide setup, competing closely with the iPhone 17 Pro Max. Google's computational photography and AI editing tools often produce superior results in challenging lighting conditions." }
    ],
    meta_title: "Google Pixel 10 Pro XL Price in USA & Full Specs | Buy or Skip?",
    meta_description: "Google Pixel 10 Pro XL at $1,199 in the USA. Tensor G5, 50 MP triple camera, 6.8\" display, 5060 mAh battery. Full specs, pros, cons & FAQs.",
    manual_seo_done: true
  }});

  console.log(`Updated google-pixel-10-pro-xl, modified: ${result.modifiedCount}`);
  await mongoose.disconnect();
}
run().catch(console.error);
