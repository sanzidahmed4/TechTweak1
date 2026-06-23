import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";
import slugify from "slugify";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const content = `The foldable smartphone market has evolved dramatically over the past few years. What was once considered an experimental category has now become a legitimate alternative to traditional flagship smartphones. Among all flip-style foldables, Motorola continues to carry one of the most iconic names in mobile history—the Razr.

With the launch of the Motorola Razr (2026), the company aims to refine its winning formula rather than completely reinvent it. Motorola has focused on improving battery life, durability, camera performance, and overall usability while maintaining the nostalgic flip-phone design that made the Razr famous.

But does the Motorola Razr (2026) deserve your money? Is it the best flip phone available today? Or are there better alternatives worth considering?

After analyzing professional reviews, early user feedback, and the phone's real-world performance, here's everything you need to know.

## Design: The Razr's Biggest Strength

The first thing you'll notice about the Motorola Razr (2026) is its design.

While many smartphones look nearly identical today, the Razr instantly stands out. The compact foldable form factor makes it easy to carry, fitting comfortably into pockets and small bags. When unfolded, it transforms into a full-sized smartphone with a premium feel.

Motorola has refined the hinge mechanism once again, resulting in a smoother opening and closing experience. The hinge feels solid, durable, and more confidence-inspiring than earlier Razr generations.

The company also continues its tradition of offering unique finishes and colors that feel more stylish and personality-driven than many competing devices.

### What We Like

* Premium construction quality
* Compact pocket-friendly design
* Improved hinge durability
* Water and dust resistance
* Unique colors and finishes

### What We Don't Like

* The crease is still visible under certain lighting conditions
* Foldables remain more delicate than traditional phones

## Display Quality: Among the Best in the Flip Category

The Razr (2026) features a large 6.9-inch foldable AMOLED display that delivers excellent color accuracy, deep blacks, and smooth animations thanks to its high refresh rate.

Whether you're watching YouTube, browsing social media, or playing games, the display feels premium and responsive.

The external cover screen remains one of the phone's most practical features. It allows users to check notifications, control music playback, reply to messages, use navigation, and even access certain apps without unfolding the device.

Motorola has also improved outdoor visibility, making the screen easier to use under direct sunlight.

### Display Highlights

* Vibrant AMOLED panel
* Smooth scrolling experience
* Excellent brightness levels
* Useful cover display
* Minimal crease distraction during normal use

## Performance: Good, But Not a Powerhouse

One area where the Motorola Razr (2026) falls behind some competitors is raw performance.

Powered by the MediaTek Dimensity 7450X processor, the phone handles everyday tasks with ease. Social media, messaging, web browsing, streaming, and productivity apps all run smoothly.

However, users looking for flagship-level gaming performance may find the chipset less impressive compared to premium processors found in similarly priced smartphones.

### Real-World Experience

For everyday users:

✔ Fast and responsive

✔ Smooth multitasking

✔ Excellent app performance

For gamers and power users:

✖ Not class-leading

✖ Heavy gaming can expose performance limitations

Most users will never notice these shortcomings, but enthusiasts may wish Motorola had included a more powerful chipset.

## Camera Performance: A Pleasant Surprise

Historically, camera performance has been one of Motorola's weaker areas. Fortunately, the Razr (2026) changes that narrative.

The upgraded camera system captures detailed photos with strong dynamic range and pleasing colors. Daylight performance is particularly impressive, producing images that are social-media ready straight from the camera.

The foldable design also creates unique photography opportunities. Users can utilize the cover display for selfies using the rear cameras, resulting in significantly better self-portraits than traditional front-facing cameras.

### Camera Strengths

* Excellent daylight photography
* Strong color reproduction
* Good ultrawide camera performance
* Unique foldable shooting modes
* Better selfies using rear cameras

### Camera Weaknesses

* Low-light performance still trails flagship leaders
* Limited zoom capabilities
* Image processing can occasionally be inconsistent

## Battery Life: The Most Important Improvement

If there is one area where Motorola deserves the most credit, it is battery life.

Previous Razr models often required battery compromises due to their foldable form factor. The 2026 model significantly improves this situation with a larger battery and better power efficiency.

Most users can comfortably get through an entire day on a single charge. Moderate users may even push into a second day before needing to recharge.

For a foldable phone, this is a major achievement.

### Battery Pros

* Reliable all-day endurance
* Better than previous Razr generations
* Fast charging support
* Wireless charging included

Battery anxiety is no longer a major concern with the Razr (2026).

## Software Experience

The Razr ships with Android 16 and Motorola's clean software experience.

Unlike many Android manufacturers that heavily customize Android, Motorola maintains a near-stock approach. The interface feels clean, intuitive, and easy to navigate.

The foldable-specific features are genuinely useful rather than gimmicky. Motorola has also introduced Moto AI features, though these still feel less polished than AI offerings from Google and Samsung.

### Software Advantages

* Clean Android experience
* Useful gesture controls
* Practical foldable features
* Minimal bloatware
* Smooth user interface

### Software Drawbacks

* AI tools need further refinement
* Software update policy still trails some competitors

## What Real Users Are Saying

After reviewing user impressions and community discussions, several consistent themes emerge.

Users love:

* The nostalgic flip-phone experience
* Premium design
* Compact portability
* Excellent battery life
* Bright displays
* Improved cameras

Users dislike:

* Premium pricing
* Mid-range processor performance
* Foldable durability concerns
* AI features that feel unfinished

Overall sentiment remains overwhelmingly positive, particularly among users transitioning from traditional slab-style smartphones.

## Pros and Cons

### Pros

✔ Beautiful premium design

✔ Excellent display quality

✔ Great battery life

✔ Improved camera performance

✔ Compact and pocket-friendly

✔ Clean Android experience

✔ Durable hinge mechanism

✔ Useful external display

### Cons

✖ Expensive compared to traditional smartphones

✖ Processor isn't flagship-level

✖ AI features lag behind competitors

✖ Cover display smaller than premium foldable rivals

✖ Long-term foldable durability remains a concern

## Final Verdict: Should You Buy the Motorola Razr (2026)?

The Motorola Razr (2026) is not the most powerful smartphone on the market. It doesn't have the strongest processor, the most advanced AI features, or the most versatile camera system.

What it does offer is something increasingly rare in today's smartphone industry: personality.

Motorola has successfully created a foldable phone that feels practical rather than experimental. The battery life is finally excellent, the cameras are genuinely good, the software is clean, and the design remains one of the most attractive in the industry.

If you're looking for a stylish foldable phone that delivers a great everyday experience, the Motorola Razr (2026) is one of the easiest recommendations in the flip-phone market.

### Rating: 8.5/10

Buy It If:

* You want a premium foldable phone
* You value design and portability
* You want excellent battery life
* You enjoy Motorola's clean Android experience

Skip It If:

* You need flagship gaming performance
* You prioritize maximum value for money
* You want the most advanced AI features available

The Motorola Razr (2026) isn't perfect, but it's the strongest evidence yet that foldable phones have finally grown up.`;

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error("No MONGODB_URI found");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB.");

  const Post = mongoose.models.Post || mongoose.model("Post", new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    tags: [{ type: String }],
    is_published: { type: Boolean, default: false },
    published_at: { type: Date, default: null },
    meta_title: { type: String },
    meta_description: { type: String },
    views: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  }, { strict: false }));

  const title = "Should You Buy the Motorola Razr (2026)? The Truth After Weeks of Real-World Use";
  const slug = slugify(title, { lower: true, strict: true });

  await Post.updateOne(
    { slug },
    {
      $set: {
        title,
        content,
        excerpt: "After analyzing professional reviews, early user feedback, and the phone's real-world performance, here's everything you need to know about the Motorola Razr (2026).",
        tags: [
          "Motorola Razr 2026", "Motorola Razr Review", "Motorola Foldable Phone",
          "Motorola Razr 2026 Review", "Motorola Razr 2026 Camera", "Motorola Razr 2026 Battery Test",
          "Motorola Razr User Experience", "Motorola Razr Pros and Cons", "Motorola Razr Buying Guide",
          "Best Foldable Phone 2026", "Best Flip Phone 2026", "Motorola Smartphone Review",
          "Android Foldable Phone", "Motorola Razr vs Samsung Flip", "Motorola Razr Features",
          "Motorola Razr Performance", "Motorola Razr Durability", "Motorola Razr Design",
          "Motorola Razr Battery Life", "Motorola Razr Camera Review", "Foldable Smartphone Review",
          "Premium Android Phone", "Tech Review", "Smartphone Review 2026", "Motorola Latest Phone",
          "Motorola Razr 2026 Price", "Motorola Razr 2026 Camera Test", "Should You Buy Motorola Razr 2026",
          "Motorola Razr vs Galaxy Z Flip"
        ],
        is_published: true,
        published_at: new Date(),
        meta_title: "Motorola Razr (2026) Review: Should You Buy It?",
        meta_description: "The Motorola Razr (2026) brings a refined foldable design, improved battery life, better cameras, and a premium user experience. Discover its strengths, weaknesses, and whether you should buy Motorola's latest flip phone.",
        updated_at: new Date()
      },
      $setOnInsert: {
        created_at: new Date(),
        views: 0
      }
    },
    { upsert: true }
  );

  console.log("Blog post successfully published!");
  process.exit(0);
}

run();
