import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const updates: Record<string, any> = {
  "samsung-galaxy-a55-5g": {
    phone_status: "released",
    price_segment: "Premium Mid-Range",
    performance_tier: "High-End",
    camera_tier: "Good",
    battery_tier: "Long-Lasting",
    internal_links: {
      same_brand: ["samsung-galaxy-a35-5g", "samsung-galaxy-s23-fe"],
      similar_price: ["nothing-phone-2a", "poco-f6"],
      upcoming: ["samsung-galaxy-a56-5g"]
    }
  },
  "samsung-galaxy-a35-5g": {
    phone_status: "released",
    price_segment: "Mid-Range",
    performance_tier: "Mainstream",
    camera_tier: "Good",
    battery_tier: "Long-Lasting",
    internal_links: {
      same_brand: ["samsung-galaxy-a55-5g", "samsung-galaxy-a25-5g"],
      similar_price: ["redmi-note-13-pro"],
      upcoming: ["samsung-galaxy-a36-5g"]
    }
  },
  "samsung-galaxy-a25-5g": {
    phone_status: "released",
    price_segment: "Mid-Range",
    performance_tier: "Mainstream",
    camera_tier: "Basic",
    battery_tier: "Long-Lasting",
    internal_links: {
      same_brand: ["samsung-galaxy-a35-5g", "samsung-galaxy-a15-5g"],
      similar_price: ["poco-x6"],
      upcoming: ["samsung-galaxy-a26-5g"]
    }
  },
  "samsung-galaxy-a15-5g": {
    phone_status: "released",
    price_segment: "Budget",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Endurance",
    internal_links: {
      same_brand: ["samsung-galaxy-a25-5g"],
      similar_price: ["redmi-13c-5g"],
      upcoming: ["samsung-galaxy-a16-5g"]
    }
  },
  "samsung-galaxy-a56-5g": {
    phone_status: "upcoming",
    leak_confidence: "Moderate",
    price_segment: "Premium Mid-Range",
    performance_tier: "High-End",
    camera_tier: "Good",
    battery_tier: "Long-Lasting",
    internal_links: {
      same_brand: ["samsung-galaxy-a55-5g"],
      upcoming: ["samsung-galaxy-a36-5g"]
    }
  },
  "samsung-galaxy-a36-5g": {
    phone_status: "upcoming",
    leak_confidence: "Moderate",
    price_segment: "Mid-Range",
    performance_tier: "Mainstream",
    camera_tier: "Good",
    battery_tier: "Long-Lasting",
    internal_links: {
      same_brand: ["samsung-galaxy-a35-5g"],
      upcoming: ["samsung-galaxy-a56-5g"]
    }
  },
  "samsung-galaxy-a26-5g": {
    phone_status: "upcoming",
    leak_confidence: "Low",
    price_segment: "Mid-Range",
    performance_tier: "Mainstream",
    camera_tier: "Basic",
    battery_tier: "Long-Lasting"
  },
  "samsung-galaxy-a16-5g": {
    phone_status: "upcoming",
    leak_confidence: "High",
    price_segment: "Budget",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Endurance"
  },
  "samsung-galaxy-a06": {
    phone_status: "upcoming",
    leak_confidence: "High",
    price_segment: "Budget",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Endurance"
  },
  "samsung-galaxy-s26-edge": {
    phone_status: "upcoming",
    leak_confidence: "Low",
    price_segment: "Ultra Premium",
    performance_tier: "Enthusiast",
    camera_tier: "Pro",
    battery_tier: "Long-Lasting"
  },
  "samsung-galaxy-z-fold-7": {
    phone_status: "upcoming",
    leak_confidence: "Moderate",
    price_segment: "Ultra Premium",
    performance_tier: "Enthusiast",
    camera_tier: "Pro",
    battery_tier: "Standard",
    internal_links: {
      same_brand: ["samsung-galaxy-z-flip-7"]
    }
  },
  "samsung-galaxy-z-flip-7": {
    phone_status: "upcoming",
    leak_confidence: "Moderate",
    price_segment: "Flagship",
    performance_tier: "High-End",
    camera_tier: "Excellent",
    battery_tier: "Standard",
    internal_links: {
      same_brand: ["samsung-galaxy-z-fold-7"]
    }
  }
};

async function run() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected to MongoDB");

    const PhoneSchema = new mongoose.Schema({}, { strict: false });
    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

    for (const [slug, data] of Object.entries(updates)) {
      await Phone.findOneAndUpdate(
        { slug },
        { $set: data },
        { new: true }
      );
      console.log(`✅ Updated missing fields for: ${slug}`);
    }

    console.log("🎉 All missing rules applied to Batch 1!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

run();
