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
  console.log("Connected to MongoDB for Xiaomi 18 Pro Max 67-fields update.");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));

  const specs67 = {
    name: "Xiaomi 18 Pro Max",
    slug: "xiaomi-18-pro-max",
    launch_status: "Rumored. Expected release 2026, November",
    launch_date: "2026, November",
    release_date: "",
    network_technology: "GSM / CDMA / HSPA / CDMA2000 / LTE / 5G",
    network_2g_bands: "GSM 850 / 900 / 1800 / 1900 - SIM 1 & SIM 2",
    network_3g_bands: "HSDPA 800 / 850 / 900 / 1700(AWS) / 1900 / 2100",
    network_4g_bands: "1, 2, 3, 4, 5, 7, 8, 12, 17, 18, 19, 20, 26, 28, 38, 40, 41, 42, 48, 66",
    network_5g_bands: "1, 3, 5, 7, 8, 20, 28, 38, 40, 41, 66, 77, 78, 79 SA/NSA",
    network_speed: "HSPA, LTE-A, 5G",
    body_dimensions: "163.5 x 75.5 x 8.8 mm",
    body_weight: "230 g",
    body_build: "Glass front (Xiaomi Dragon Crystal Glass), glass back or eco leather back, titanium frame",
    sim: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistant: "IP68/IP69 dust/water resistant (up to 2m for 30 min)",
    display_type: "LTPO AMOLED, 1B colors, 120Hz, Dolby Vision, HDR10+",
    display_size: "6.9 inches",
    display_resolution: "1440 x 3200 pixels",
    display_protection: "Xiaomi Dragon Crystal Glass",
    display_peak_nits: "4000 nits peak (1-nit ultra-low dimming)",
    os: "HyperOS 2.0 based on Android 16",
    chipset: "Qualcomm Snapdragon 8 Elite Gen 6 Pro (2 nm)",
    cpu: "Octa-core architecture (Oryon cores)",
    gpu: "Adreno 840",
    memory_card_slot: "No",
    internal_storage: "256GB 12GB RAM, 512GB 16GB RAM, 1TB 16GB RAM, 1TB 24GB RAM",
    camera_main: "200 MP OIS (Main) + 200 MP OIS (Periscope) + 50 MP UW, LOFIC HDR 3.0",
    camera_main_features: "Leica lenses, Dual-LED dual-tone flash, HDR, panorama, 67mm filter ring holder",
    camera_main_video: "8K@24/30fps, 4K@24/30/60/120fps, 1080p@30/60/120/240/480/960/1920fps, gyro-EIS, Dolby Vision HDR 10-bit rec.",
    camera_front: "32 MP, f/2.0, (wide), Under Display Camera",
    camera_front_features: "HDR, panorama",
    camera_front_video: "4K@30/60fps, 1080p@30/60fps, gyro-EIS",
    loudspeaker: "Yes, with stereo speakers",
    audio_jack: "No",
    wlan: "Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band, Wi-Fi Direct",
    bluetooth: "5.4, A2DP, LE, aptX HD, aptX Adaptive, LDAC, LHDC 5.0",
    gps: "GPS (L1+L5), GLONASS (G1), BDS (B1I+B1c+B2a), GALILEO (E1+E5a), QZSS (L1+L5), NavIC (L5)",
    nfc: "Yes",
    radio: "No",
    usb: "USB Type-C 3.2 Gen 2, DisplayPort, OTG",
    sensors_fingerprint: "Fingerprint (under display, ultrasonic)",
    sensors_other: "Accelerometer, gyro, proximity, compass, color spectrum, barometer",
    battery_type: "Silicon-Carbon High-Density",
    battery_capacity: "8500 mAh",
    battery_charging: "120W wired, PD3.0, QC4, 100% in 35 min (advertised)",
    battery_wireless_charging: "80W wireless, 100% in 45 min (advertised)",
    battery_reverse_charging: "10W reverse wireless",
    colors: "Black, White, Titanium Gray, Olive Green",
    price: "Expected around $1199",
    made_in: "China",
    processor: "Qualcomm Snapdragon 8 Elite Gen 6 Pro (2 nm)",
    charging_wired: "120W",
    charging_wireless: "80W",
    charging_reverse: "10W",
    camera_main_sensors: "200 MP, 200 MP, 50 MP",
    camera_front_sensors: "32 MP",
    bluetooth_version: "5.4",
    wi_fi_version: "Wi-Fi 7",
    usb_type: "Type-C 3.2",
    sim_type: "Nano-SIM / eSIM",
    audio_jack_3_5mm: "No",
    nfc_support: "Yes",
    water_resistance_rating: "IP69",
    refresh_rate: "120Hz",
    fast_charging_support: "Yes",
    physical_weight: "230 g"
  };

  const res = await Phone.updateOne(
      { slug: "xiaomi-18-pro-max" },
      { $set: specs67 }
  );

  if (res.modifiedCount > 0) {
      console.log(`Successfully mapped all 67 fields for Xiaomi 18 Pro Max.`);
  } else {
      console.log(`No changes made. Either fields were already correct or phone not found.`);
  }

  mongoose.disconnect();
}

run().catch(console.error);
