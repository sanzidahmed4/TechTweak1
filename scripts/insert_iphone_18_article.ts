import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Setup Mongoose models
const CategorySchema = new mongoose.Schema({ name: String, slug: String });
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const PostSchema = new mongoose.Schema({
  title: String,
  slug: String,
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  content: String,
  excerpt: String,
  tags: [String],
  featured_image: String,
  is_published: Boolean,
  published_at: Date,
  meta_title: String,
  meta_description: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});
const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

const MONGODB_URI = process.env.MONGODB_URI;

const articleContent = `Apple’s upcoming iPhone 18 lineup is already generating major buzz across trusted tech sources like MacRumors, The Information, Tom’s Guide, and industry analysts including Ming-Chi Kuo.

Based on current leaks and supply-chain reports, Apple may introduce one of its biggest iPhone strategy changes in years with the iPhone 18 series.

---

## Apple May Split the iPhone 18 Launch Timeline

According to reports summarized by MacRumors, Apple is reportedly planning a split launch schedule:

* iPhone 18 Pro
* iPhone 18 Pro Max
* Foldable iPhone (“iPhone Fold” or “iPhone Ultra”)

could launch in September 2026, while:

* Standard iPhone 18
* iPhone 18e

may arrive later in Spring 2027.

This would be one of the biggest changes to Apple’s traditional yearly iPhone release strategy.

Source:
[https://www.macrumors.com/roundup/iphone-18/](https://www.macrumors.com/roundup/iphone-18/)

---

## iPhone Fold Could Launch Alongside iPhone 18 Pro

Multiple reports suggest Apple’s first foldable iPhone is now closely tied to the iPhone 18 Pro lineup.

According to MacRumors Foldable iPhone Guide, the device may feature:

* Book-style foldable design
* Around 5.5-inch outer display
* Around 7.8-inch inner display
* Titanium + aluminum frame
* Nearly invisible display crease
* A20 chip
* 12GB RAM
* Price above $2,000

Leaked dummy units shared by industry leakers reportedly show a passport-style folding design similar to existing foldables from competitors.

Sources:
[https://www.macrumors.com/roundup/iphone-fold/](https://www.macrumors.com/roundup/iphone-fold/)
[https://www.macrumors.com/2026/04/07/foldable-iphone-design-revealed/](https://www.macrumors.com/2026/04/07/foldable-iphone-design-revealed/)

---

## Apple Reportedly Working on a “Crease-Free” Foldable Display

One of the biggest rumors surrounding the foldable iPhone is Apple’s attempt to eliminate visible screen creases.

Recent leaks reported by Tom’s Guide and TechRadar claim Apple has achieved a “visually crease-free” display using advanced layered glass technology and a redesigned hinge mechanism.

However, reports also say the hinge is still failing some of Apple’s durability tests, which could potentially delay the foldable model.

Sources:
[https://www.tomsguide.com/phones/iphones/iphone-fold-achieves-a-visually-crease-free-state-according-to-leaker-but-fears-over-the-hinge-could-lead-to-delays](https://www.tomsguide.com/phones/iphones/iphone-fold-achieves-a-visually-crease-free-state-according-to-leaker-but-fears-over-the-hinge-could-lead-to-delays)
[https://www.techradar.com/phones/iphone/iphone-ultra-delayed-until-2027-apple-is-reportedly-struggling-to-solve-a-major-hinge-problem-but-the-phones-visually-creaseless-display-sounds-promising](https://www.techradar.com/phones/iphone/iphone-ultra-delayed-until-2027-apple-is-reportedly-struggling-to-solve-a-major-hinge-problem-but-the-phones-visually-creaseless-display-sounds-promising)

---

## A20 Chip Could Be Apple’s First 2nm Processor

Several trusted leaks suggest the iPhone 18 Pro models may use Apple’s new A20 Pro chip, reportedly manufactured using TSMC’s 2nm process.

Expected improvements include:

* Better battery efficiency
* Faster AI processing
* Lower heat generation
* Improved gaming performance

If accurate, this could be one of Apple’s largest chip upgrades since the move to 3nm processors.

Source:
[https://www.macrumors.com/roundup/iphone-18-pro/](https://www.macrumors.com/roundup/iphone-18-pro/)

---

## Under-Display Face ID & Smaller Dynamic Island

Reports from MacRumors citing information from The Information suggest Apple may finally move some Face ID components under the display.

Earlier rumors claimed the Dynamic Island would disappear entirely, but newer reports indicate Apple may instead reduce its size rather than remove it completely.

Expected display changes include:

* Smaller Dynamic Island
* Partial under-display Face ID
* Front camera repositioning
* Cleaner front design

Sources:
[https://www.macrumors.com/2025/12/16/iphone-18-pro-features-report/](https://www.macrumors.com/2025/12/16/iphone-18-pro-features-report/)
[https://www.theinformation.com/](https://www.theinformation.com/)

---

## Variable Aperture Camera Rumored for iPhone 18 Pro

Another major leak points to Apple adding a mechanical variable aperture camera to at least one iPhone 18 Pro model.

This would allow the camera lens to physically adjust light intake, similar to professional cameras.

Potential benefits include:

* Improved low-light photography
* Better portrait depth
* More natural background blur
* Improved exposure control

Some leaks suggest aperture ranges between f/1.6 and f/22, though this remains unconfirmed.

Sources:
[https://www.macrumors.com/2025/12/16/iphone-18-pro-features-report/](https://www.macrumors.com/2025/12/16/iphone-18-pro-features-report/)
[https://www.yankodesign.com/2026/05/19/iphone-18-pro-max-leak-mechanical-iris-camera-2nm-a20-pro-and-dark-cherry-finish/](https://www.yankodesign.com/2026/05/19/iphone-18-pro-max-leak-mechanical-iris-camera-2nm-a20-pro-and-dark-cherry-finish/)

---

## New Colors & Design Refinements

According to recent reports, Apple may introduce a new Dark Cherry color option for the iPhone 18 Pro lineup.

Other rumored design changes include:

* Slightly thinner body
* Longer battery life
* Refined rear camera layout
* Updated Ceramic Shield finish

Most sources currently suggest Apple will keep the overall design language similar to the iPhone 17 series rather than introducing a complete redesign.

Sources:
[https://www.macrumors.com/2026/04/28/iphone-18-pro-rumor-list/](https://www.macrumors.com/2026/04/28/iphone-18-pro-rumor-list/)
[https://www.macrumors.com/2026/02/05/iphone-18-pro-rumors-features/](https://www.macrumors.com/2026/02/05/iphone-18-pro-rumors-features/)

---

## Expected iPhone 18 Features (Rumored)

| Feature                      | Current Leak Status |
| ---------------------------- | ------------------- |
| A20 Pro 2nm chip             | Strong rumors       |
| Smaller Dynamic Island       | Likely              |
| Under-display Face ID        | Possible            |
| Variable aperture camera     | Likely for Pro      |
| Foldable iPhone launch       | Highly rumored      |
| Split release schedule       | Strong reports      |
| Crease-free foldable display | In testing          |
| Deep red/Dark Cherry color   | Rumored             |
| C2 modem                     | Expected            |

---

## Final Thoughts

The iPhone 18 lineup could become one of Apple’s most ambitious smartphone generations yet. The biggest rumored changes include Apple’s foldable iPhone debut, the new A20 2nm chip, camera hardware upgrades, and a completely new release strategy.

Still, many details remain unconfirmed, and Apple could change features before launch.`;

async function run() {
  try {
    if (!MONGODB_URI) throw new Error("MONGODB_URI is undefined");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // 1. Get or create a category
    let category = await Category.findOne({ slug: 'news' });
    if (!category) {
      category = await Category.findOne({ slug: 'rumors' });
    }
    if (!category) {
      category = await Category.create({ name: 'News', slug: 'news' });
    }

    // 2. SEO Keywords
    const keywords = [
      "iPhone 18", "iPhone 18 leaks", "iPhone 18 rumors", "Apple iPhone 18", "iPhone 18 Pro",
      "iPhone 18 Pro Max", "iPhone 18 release date", "iPhone 18 specifications", "iPhone 18 features",
      "iPhone 18 design", "Apple A20 Pro chip", "iPhone Fold", "Foldable iPhone"
    ];

    // 3. Post Details
    const title = "iPhone 18 Leaks & Rumors: Everything We Know So Far (2026)";
    const slug = "iphone-18-leaks-rumors-2026";
    const excerpt = "Discover the latest iPhone 18 leaks and rumors, including the Apple A20 Pro 2nm chip, smaller Dynamic Island, variable aperture camera, and the upcoming foldable iPhone release date.";
    
    // 4. Upsert the post
    const postData = {
      title,
      slug,
      category_id: category._id,
      content: articleContent,
      excerpt,
      tags: keywords,
      featured_image: "https://res.cloudinary.com/dcb4ilgpy/image/upload/v1716024976/tech_placeholder.jpg", // Needs replacement if a real image is provided
      is_published: true,
      published_at: new Date(),
      meta_title: "iPhone 18 Leaks & Rumors: Features, Specs & Release Date (2026)",
      meta_description: "Exclusive iPhone 18 leaks and rumors for 2026. Everything we know about the Apple iPhone 18 Pro Max, Foldable iPhone, A20 Pro chip, and Under-display Face ID."
    };

    const updatedPost = await Post.findOneAndUpdate(
      { slug },
      { $set: postData },
      { upsert: true, new: true }
    );

    console.log("🎉 Article published successfully!");
    console.log("URL: https://www.techtweak.tech/news/" + slug);

  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

run();
