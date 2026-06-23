import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

function parseSafeNumber(value: any): number | null {
  if (!value) return null;
  if (typeof value === "number") return value;
  const cleanVal = (value as string).replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleanVal);
  return isNaN(parsed) ? null : parsed;
}

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error("No MONGODB_URI found");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB.");

  // We can just use the native mongoose connection to update documents directly
  // avoiding the need to import the Next.js model which might have issues in a raw script.
  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));

  const phones = await Phone.find({});
  let updatedCount = 0;

  for (const p of phones) {
    const autoPros: string[] = [];
    const autoCons: string[] = [];
    const autoFaqs: any[] = [];

    const has_5g = p.has_5g;
    const battery_capacity = p.battery_capacity;
    const display_type = p.display_type;
    const refresh_rate = p.refresh_rate;
    const cam_main_sensor = p.cam_main_sensor;
    const water_resistance = p.water_resistance;
    const charger_included = p.charger_included;
    const has_audio_jack = p.has_audio_jack;
    const weight = p.weight;
    const charging_wired = p.charging_wired;
    const made_in = p.made_in;
    const nfc = p.has_nfc;
    const storage_type = p.storage_type;

    if (has_5g) autoPros.push("Supports Latest 5G Network");
    if (nfc) autoPros.push("NFC support for contactless payments");
    
    const parsedBattery = battery_capacity ? parseSafeNumber(battery_capacity) : null;
    if (parsedBattery && parsedBattery >= 5000) autoPros.push(`Large ${battery_capacity} Battery for all-day use`);
    
    if (display_type && (display_type.toLowerCase().includes('amoled') || display_type.toLowerCase().includes('oled'))) autoPros.push("Vibrant and crisp AMOLED/OLED display");
    if (display_type && display_type.toLowerCase().includes('ltpo')) autoPros.push("LTPO technology for better battery efficiency");
    
    const parsedRefresh = refresh_rate ? parseSafeNumber(refresh_rate) : null;
    if (parsedRefresh && parsedRefresh >= 120) autoPros.push("Smooth 120Hz+ High Refresh Rate Screen");
    
    const parsedCam = cam_main_sensor ? parseSafeNumber(cam_main_sensor) : null;
    if (parsedCam && parsedCam >= 50) autoPros.push(`High resolution ${parsedCam}MP Main Camera`);
    if (cam_main_sensor && cam_main_sensor.toLowerCase().includes('ois')) autoPros.push("Optical Image Stabilization (OIS) for steady shots");
    
    if (water_resistance && water_resistance.includes("IP68")) autoPros.push("IP68 Water and Dust Resistant");
    if (storage_type && (storage_type.includes("UFS 4.0") || storage_type.includes("NVMe"))) autoPros.push("Ultra-fast UFS 4.0 / NVMe storage");
    
    if (charger_included === false) autoCons.push("Charging adapter is not included in the box");
    if (has_audio_jack === false) autoCons.push("Lacks a 3.5mm headphone jack");
    
    const parsedWeight = weight ? parseSafeNumber(weight) : null;
    if (parsedWeight && parsedWeight >= 210) autoCons.push("Device is relatively heavy");
    if (parsedWeight && parsedWeight < 170) autoPros.push("Lightweight and comfortable to hold");

    if (charging_wired) autoFaqs.push({ question: "Does it support fast charging?", answer: `Yes, it supports ${charging_wired}.` });
    if (has_5g) autoFaqs.push({ question: "Does this smartphone support 5G?", answer: "Yes, it is fully compatible with 5G networks for high-speed internet." });
    autoFaqs.push({ question: "Is the charger included in the box?", answer: (charger_included) ? "Yes, a compatible charging adapter is included in the retail box." : "No, the retail box only contains the phone and a cable. The charging brick must be purchased separately." });
    if (water_resistance) autoFaqs.push({ question: "Is this phone water-resistant?", answer: water_resistance });
    if (made_in) autoFaqs.push({ question: "Where is this phone manufactured?", answer: `This device is manufactured in ${made_in}.` });

    // Update the document
    await Phone.updateOne({ _id: p._id }, { 
      $set: { 
        pros: autoPros, 
        cons: autoCons, 
        faqs: autoFaqs 
      } 
    });
    updatedCount++;
  }

  console.log(`Successfully generated Pros/Cons/FAQs for ${updatedCount} phones.`);
  process.exit(0);
}

run();
