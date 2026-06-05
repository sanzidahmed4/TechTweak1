import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const phoneUpdates = [
  { slug: "samsung-galaxy-s24-ultra", dateStr: "2024-01-31" },
  { slug: "samsung-galaxy-s24-plus", dateStr: "2024-01-31" },
  { slug: "samsung-galaxy-s24", dateStr: "2024-01-31" },
  { slug: "samsung-galaxy-s24-fe", dateStr: "2024-10-01" }, // Approximated
  { slug: "samsung-galaxy-s23-ultra", dateStr: "2023-02-17" },
  { slug: "samsung-galaxy-s23-plus", dateStr: "2023-02-17" },
  { slug: "samsung-galaxy-s23", dateStr: "2023-02-17" },
  { slug: "samsung-galaxy-s23-fe", dateStr: "2023-10-26" }
];

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error("No MONGODB_URI found");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB.");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));

  for (const update of phoneUpdates) {
    const parsed = new Date(update.dateStr);
    
    // Formatting dateStr nicely for the frontend text display
    const formattedText = parsed.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

    const result = await Phone.updateOne(
      { slug: update.slug },
      { 
        $set: { 
          release_date: formattedText,
          release_date_parsed: parsed
        } 
      }
    );
    console.log(`Updated ${update.slug}: ${result.modifiedCount} document(s)`);
  }

  console.log("Samsung dates fixed.");
  process.exit(0);
}

run();
