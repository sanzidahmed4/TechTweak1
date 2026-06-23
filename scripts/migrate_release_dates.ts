import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// A robust date parser for standard phone release dates
function parseReleaseDate(dateStr: string | null | undefined): Date | null {
  if (!dateStr || dateStr.trim() === "") return null;
  
  // Clean up standard annotations like "Expected" or "Announced"
  let cleanStr = dateStr.replace(/exp\.|expected|announced/i, '').trim();

  // Try standard JS Date parsing first
  const parsed = new Date(cleanStr);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }

  // Handle specific formats like "2024, June" -> "June 2024"
  const commaMatch = cleanStr.match(/^(\d{4}),\s*([a-zA-Z]+)$/);
  if (commaMatch) {
    const parsedComma = new Date(`${commaMatch[2]} ${commaMatch[1]}`);
    if (!isNaN(parsedComma.getTime())) return parsedComma;
  }

  // Handle just a year "2024" -> assume Jan 1, 2024
  if (/^\d{4}$/.test(cleanStr)) {
    return new Date(`${cleanStr}-01-01`);
  }

  return null;
}

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error("No MONGODB_URI found");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB.");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));

  const phones = await Phone.find({});
  let updatedCount = 0;

  const report = {
    total_phones: phones.length,
    missing_release_dates: [] as any[],
    invalid_release_dates: [] as any[],
    missing_prices: [] as any[],
  };

  for (const p of phones) {
    const rawDate = p.release_date;
    const parsedDate = parseReleaseDate(rawDate);

    if (!rawDate) {
      report.missing_release_dates.push({ id: p._id, name: p.name, slug: p.slug });
    } else if (!parsedDate) {
      report.invalid_release_dates.push({ id: p._id, name: p.name, slug: p.slug, rawDate });
    }

    if (!p.price_usd && !p.price_official) {
      report.missing_prices.push({ id: p._id, name: p.name, slug: p.slug });
    }

    await Phone.updateOne(
      { _id: p._id },
      { $set: { release_date_parsed: parsedDate } }
    );
    updatedCount++;
  }

  console.log(`Successfully migrated ${updatedCount} phones.`);
  
  // Write the report
  const reportPath = "C:\\Users\\Sanzid\\.gemini\\antigravity\\brain\\631d2150-7436-4d52-90ff-1d84e00e169a\\sorting_audit_report.md";
  let reportMd = `# Data Validation & Sorting Audit Report\n\n`;
  reportMd += `**Total Phones Analyzed:** ${report.total_phones}\n\n`;
  
  reportMd += `## 1. Missing Release Dates (${report.missing_release_dates.length})\n`;
  reportMd += `These phones will automatically sink to the bottom of the listings due to the new chronological sorting system handling \`null\` values gracefully.\n\n`;
  report.missing_release_dates.forEach(p => {
    reportMd += `- **${p.name}** (\`${p.slug}\`)\n`;
  });
  if (report.missing_release_dates.length === 0) reportMd += `- None\n`;

  reportMd += `\n## 2. Invalid/Unparseable Release Dates (${report.invalid_release_dates.length})\n`;
  reportMd += `These phones had release date strings that could not be algorithmically converted to a valid Date object. They have been treated as missing dates and placed at the bottom.\n\n`;
  report.invalid_release_dates.forEach(p => {
    reportMd += `- **${p.name}** (\`${p.slug}\`) - *Raw String: "${p.rawDate}"*\n`;
  });
  if (report.invalid_release_dates.length === 0) reportMd += `- None\n`;

  reportMd += `\n## 3. Missing Prices (${report.missing_prices.length})\n`;
  reportMd += `These phones are missing official USD pricing. They will continue to be sorted chronologically by release date, but will fall below similarly-aged phones in secondary sorting.\n\n`;
  report.missing_prices.forEach(p => {
    reportMd += `- **${p.name}** (\`${p.slug}\`)\n`;
  });
  if (report.missing_prices.length === 0) reportMd += `- None\n`;

  fs.writeFileSync(reportPath, reportMd);
  console.log(`Report generated at: ${reportPath}`);

  process.exit(0);
}

run();
