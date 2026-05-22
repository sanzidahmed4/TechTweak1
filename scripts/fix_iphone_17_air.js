require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("No MONGODB_URI"); process.exit(1); }

const PhoneSchema = new mongoose.Schema({}, { strict: false });

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

  const updateData = {
    // Battery & Charging
    battery_capacity: "3,100 mAh (Estimated for ultra-thin design)",
    charging_wired: "25W wired, 50% in 30 min",
    charging_wireless: "15W MagSafe, 15W Qi2 wireless",
    charging_reverse: "No",
    charger_included: false,

    // Network & Connectivity
    wifi_version: "Wi-Fi 7 (802.11be) with 2x2 MIMO",
    bluetooth_version: "Bluetooth 5.4",
    gps_specs: "Precision dual-frequency GPS (GPS, GLONASS, Galileo, QZSS, BeiDou)",
    sim_type: "eSIM only (in US), Nano-SIM + eSIM (Global)",
    usb_version: "USB-C (USB 3.2 Gen 2 - up to 10Gbps)",

    // General & Display Extras
    protection: "Ceramic Shield 2 (Next-gen scratch resistance)",
    brightness: "1000 nits typical, 2000 nits peak outdoor",
    pixel_density: "460 ppi",
    hdr: "HDR10, Dolby Vision",

    // Camera Extras
    cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps, Cinematic mode",
    cam_front_video: "4K@24/30/60fps, 1080p@30/60fps",

    // Hardware Extras
    cpu: "Apple A19 Pro (3 nm) — 6-core CPU",
    gpu: "Apple GPU (5-core graphics)"
  };

  const res = await Phone.updateOne({ slug: "iphone-17-air" }, { $set: updateData });
  console.log(`Updated iphone-17-air: matched ${res.matchedCount}, modified ${res.modifiedCount}`);

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
}

run().catch(e => { console.error(e); process.exit(1); });
