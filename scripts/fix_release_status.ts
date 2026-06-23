import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error("No MONGODB_URI found");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB for Release Status Correction (Current Year: 2026).");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));

  // Fix statuses for phones that are already released by June 2026
  const releasedMap: Record<string, string> = {
    // Apple 2025
    "iphone-17-pro-max": "Available. Released 2025, September 19",
    "iphone-17-pro": "Available. Released 2025, September 19",
    "iphone-17": "Available. Released 2025, September 19",
    "iphone-17-air": "Available. Released 2025, September 19",
    "iphone-16e": "Available. Released 2025, March 14",

    // Google 2025
    "google-pixel-10": "Available. Released 2025, August 28",
    "google-pixel-10-pro": "Available. Released 2025, August 28",
    "google-pixel-10-pro-xl": "Available. Released 2025, August 28",
    "google-pixel-10-pro-fold": "Available. Released 2025, August 28",

    // Samsung 2025 & Early 2026
    "samsung-galaxy-s25-ultra": "Available. Released 2025, February 03",
    "samsung-galaxy-s25-plus": "Available. Released 2025, February 03",
    "samsung-galaxy-s25": "Available. Released 2025, February 03",
    "samsung-galaxy-s25-edge": "Available. Released 2025, May 30",
    "samsung-galaxy-s25-fe": "Available. Released 2025, October 04",
    "samsung-galaxy-s26-ultra": "Available. Released 2026, January 15",
    "samsung-galaxy-s26-plus": "Available. Released 2026, January 15",
    "samsung-galaxy-s26": "Available. Released 2026, January 15",

    // Motorola 2025 & Early 2026
    "motorola-razr-2025": "Available. Released 2025, June",
    "motorola-razr-plus-2025": "Available. Released 2025, June",
    "motorola-edge-2025": "Available. Released 2025, June",
    "moto-g-2025": "Available. Released 2025, February",
    "moto-g-stylus-5g-2025": "Available. Released 2025, May",
    "moto-g-2026": "Available. Released 2026, February",
    "moto-g-play-2026": "Available. Released 2026, January",
    
    // Motorola Mid 2026 (Released right about now, May/June 2026)
    "motorola-razr-2026": "Available. Released 2026, June",
    "motorola-razr-ultra-2026": "Available. Released 2026, June",
    "motorola-edge-2026": "Available. Released 2026, June",

    // iQOO Early/Mid 2026
    "iqoo-neo-11": "Available. Released 2026, May",
  };

  // Phones that are TRULY upcoming in Late 2026
  const upcomingMap: Record<string, string> = {
    "xiaomi-18-pro-max": "Expected release 2026, Q3",
    "iqoo-14": "Expected release 2026, Q4",
  };

  let updated = 0;

  for (const [slug, status] of Object.entries(releasedMap)) {
    const res = await Phone.updateOne(
        { slug: slug },
        { $set: { 
            launch_status: status, 
            launch_date: status.replace("Available. ", ""),
            release_date: status.replace("Available. ", "")
        }}
    );
    if (res.modifiedCount > 0) updated++;
  }

  for (const [slug, status] of Object.entries(upcomingMap)) {
    const res = await Phone.updateOne(
        { slug: slug },
        { $set: { 
            launch_status: "Rumored. " + status, 
            launch_date: status,
            release_date: ""
        }}
    );
    if (res.modifiedCount > 0) updated++;
  }

  console.log(`Successfully fixed release status for ${updated} phones based on the 2026 timeline.`);
  mongoose.disconnect();
}

run().catch(console.error);
