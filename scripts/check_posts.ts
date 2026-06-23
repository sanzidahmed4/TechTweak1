import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Import models like the app does
import '../src/lib/models/Category'; // Important to register Category
import '../src/lib/models/Post';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

async function run() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected to MongoDB");

    const Post = mongoose.models.Post;
    const Category = mongoose.models.Category;

    const posts = await Post.find({});
    
    if (posts.length > 0) {
      const dbSlug = posts[0].slug;
      console.log(`Testing slug: ${dbSlug}`);
      
      const decodedSlug = decodeURIComponent(dbSlug);

      const rawPost = await Post.findOne({ slug: decodedSlug })
        .populate('category_id', 'name slug')
        .lean();
        
      if (rawPost) {
        console.log("✅ Post Found with populate:", rawPost.title);
      } else {
        console.log("❌ Post NOT FOUND");
      }
    }

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
