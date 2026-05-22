const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
});

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  content: { type: String, required: true },
  excerpt: { type: String },
  tags: [{ type: String }],
  featured_image: { type: String },
  is_published: { type: Boolean, default: false },
  published_at: { type: Date, default: null },
  meta_title: { type: String },
  meta_description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

const markdownContent = `
## Welcome to TechTweak

We are incredibly excited to officially welcome you to **TechTweak** — your new ultimate destination for everything related to smartphones and mobile technology. In a world where a new device is launched almost every week, keeping up with the rapid pace of innovation can feel overwhelming. That’s precisely why TechTweak was born. 

Our mission is simple: to empower you with **accurate, unbiased, and comprehensive information** so you can make the best decisions when investing in your next piece of technology.

---

### What Can You Expect From Us?

At TechTweak, we believe in bridging the gap between complex tech jargon and everyday consumer needs. Here is a breakdown of what our platform offers to help you navigate the mobile ecosystem:

#### 📱 **The Ultimate Smartphone Directory**
We have built an extensive database of smartphones from all major brands like Apple, Samsung, Google, Xiaomi, and more. Our directory doesn't just list phones; it allows you to filter and sort devices by exact specifications. Looking for a phone with a massive battery under a specific budget? We've got you covered.

#### ⚖️ **Side-by-Side Comparisons**
Stuck between two choices? Our interactive comparison engine lets you put two or more smartphones head-to-head. Compare processors, camera setups, battery capacities, and physical dimensions in a clean, easy-to-read format.

#### 📰 **News, Leaks & Updates**
The tech world moves fast. Through our News & Articles section, you’ll get the latest scoop on upcoming releases, software updates (like iOS and Android OS features), and exclusive industry leaks.

#### 💡 **In-Depth Reviews & Buying Guides**
Specs only tell half the story. Our expert reviews dive deep into real-world performance, camera quality, battery endurance, and software experience. Furthermore, our curated buying guides will help you find the best gaming phones, the best budget devices, or the absolute best camera kings of the year.

---

### Our Future Approach

TechTweak is not just a static directory; it is a continuously evolving platform. As we move forward, we are committed to implementing several cutting-edge features:

1. **AI-Powered Recommendations:** We are working on intelligent algorithms that will suggest the perfect smartphone based on your unique usage habits and budget.
2. **Community Driven Reviews:** In the near future, we plan to introduce user reviews and ratings, allowing the TechTweak community to share their personal experiences with specific devices.
3. **Price Tracking & Alerts:** We want to ensure you get the best deal possible. Upcoming features will include price drop alerts and aggregate pricing from trusted vendors.
4. **Expanded Ecosystem:** While smartphones are our primary focus right now, we envision expanding our coverage to tablets, smartwatches, and true wireless earbuds, creating a holistic tech review ecosystem.

---

### How You Can Utilize TechTweak

Whether you are a casual buyer looking for an upgrade or a hardcore tech enthusiast analyzing CPU benchmarks, TechTweak is designed for you. 

- **Researching a Purchase:** Use our category filters to narrow down your choices, read our unbiased reviews, and use the comparison tool to finalize your decision.
- **Staying Informed:** Bookmark our News section to stay updated on the latest OS updates, rumors, and tech trends.
- **Solving Problems:** Our "How-To" and guide sections (coming soon!) will provide step-by-step solutions for optimizing your smartphone's performance and battery life.

We are thrilled to embark on this journey with you. Technology is meant to simplify and enhance our lives, and at TechTweak, we are dedicated to making sure you find the right tech to do exactly that. 

Thank you for visiting, and welcome to the future of tech exploration!
`;

async function publishArticle() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    // Ensure Category
    let category = await Category.findOne({ slug: "announcements" });
    if (!category) {
      category = await Category.create({
        name: "Announcements",
        slug: "announcements",
        description: "Official news and updates regarding the TechTweak platform."
      });
      console.log("Created category: Announcements");
    }

    // Check if post exists
    const existingPost = await Post.findOne({ slug: "welcome-to-techtweak-future-approach" });
    if (existingPost) {
      console.log("Article already exists. Deleting it to re-publish...");
      await Post.findByIdAndDelete(existingPost._id);
    }

    // Create Post
    const newPost = await Post.create({
      title: "Welcome to TechTweak: Our Vision, Features, and Future Approach",
      slug: "welcome-to-techtweak-future-approach",
      category_id: category._id,
      content: markdownContent.trim(),
      excerpt: "Welcome to TechTweak! Discover how our platform will empower you with accurate smartphone data, comparisons, and our vision for the future.",
      tags: ["TechTweak", "Announcements", "Future Approach", "Smartphones"],
      featured_image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      is_published: true,
      published_at: new Date(),
      meta_title: "Welcome to TechTweak: Our Vision & Future Approach",
      meta_description: "Discover the ultimate smartphone directory and review hub. Learn about TechTweak's mission, core features, and future AI-driven approach.",
    });

    console.log("Successfully published article!");
    process.exit(0);
  } catch (error) {
    console.error("Error publishing article:", error);
    process.exit(1);
  }
}

publishArticle();
