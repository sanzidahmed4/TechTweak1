const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function fix() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  const update = {
    // === STATUS FLAGS (all corrected) ===
    phone_status: 'released',
    is_official: true,
    upcoming: false,
    is_published: true,
    is_featured: false,
    price_status: 'official',
    release_date: 'October 30, 2025',
    launch_date: 'October 30, 2025',
    launch_status: 'Available. Released October 30, 2025',

    // === IDENTITY ===
    name: 'iQOO Neo 11',
    slug: 'iqoo-neo-11',
    model_number: 'N/A (China only)',
    made_in: 'China',
    colors: ['Light White', 'Pixel Orange', 'Shadow Black', 'Facing the Gale'],

    // === PRICING ===
    price_usd: 349,
    price: 349,
    price_display_text: '$349',
    display_price: '$349',

    // === DISPLAY ===
    display_type: 'LTPO AMOLED, 1B colors, 144Hz, HDR10+',
    screen_size: '6.82 inches',
    resolution: '1440 x 3168 pixels (QHD+)',
    refresh_rate: '144Hz',
    brightness: '3000 nits (peak)',
    hdr: 'HDR10+',
    protection: 'Scratch-resistant glass',
    pixel_density: '~510 ppi density',
    display_highlight: '6.82" 144Hz QHD+ LTPO AMOLED',

    // === PLATFORM ===
    processor: 'Qualcomm Snapdragon 8 Elite (SM8750-AC) (3 nm)',
    cpu: 'Octa-core (2x4.32 GHz Oryon V2 Phoenix L & 6x3.53 GHz Oryon V2 Phoenix M)',
    gpu: 'Adreno 830',
    fabrication: '3 nm',
    chipset_highlight: 'Snapdragon 8 Elite + iQOO Q2 Gaming Chip',

    // === MEMORY ===
    ram_variants: '12GB, 16GB',
    storage_variants: '256GB, 512GB, 1TB',
    storage_type: 'UFS 4.1',
    phone_variants: '12GB/256GB, 16GB/512GB, 16GB/1TB',

    // === CAMERAS ===
    cam_count: 'Dual',
    cam_main_sensor: '50 MP, f/1.88, 23mm (wide), Sony LYT-700V, PDAF, OIS',
    cam_ultrawide: '8 MP, f/2.2, 120˚ (ultrawide)',
    cam_telephoto: 'Not Available',
    cam_macro: 'Not Available',
    cam_ois: 'OIS on Main Camera',
    cam_flash: 'Dual-LED flash',
    cam_video: '4K@30/60fps, 1080p@120fps, gyro-EIS',
    cam_front_resolution: '16 MP, f/2.4, 26mm (wide)',
    cam_front_video: '1080p@30fps',
    camera_highlight: '50MP Sony LYT-700V OIS + 8MP Ultrawide',
    camera_main: '50 MP OIS (Sony LYT-700V), 8 MP Ultrawide',
    camera_front: '16 MP, f/2.4',

    // === BATTERY ===
    battery_capacity: '7500 mAh (Si/C Li-Ion)',
    charging_wired: '100W wired',
    charging_wireless: 'Not Supported',
    charging_reverse: 'Not Supported',
    charger_included: true,
    battery_highlight: '7500mAh, 100W Fast Charge',

    // === BODY ===
    dimensions: '163.4 x 76.7 x 8.1 mm',
    weight: '210 g',
    physical_weight: '210 g',
    build_material: 'Glass front, metal frame, plastic/glass back',
    sim_type: 'Dual SIM (Nano-SIM, dual stand-by)',
    water_resistance: 'IP68/IP69 dust and water resistant',
    ip_rating: 'IP68/IP69',

    // === CONNECTIVITY ===
    network: 'GSM / CDMA / HSPA / CDMA2000 / LTE / 5G',
    has_5g: true,
    wifi_version: 'Wi-Fi 802.11 a/b/g/n/ac/6e',
    bluetooth_version: '5.4, A2DP, LE, aptX HD',
    has_nfc: true,
    gps_specs: 'GPS, GLONASS, BDS, GALILEO',
    has_ir_blaster: true,
    has_audio_jack: false,
    usb_type: 'USB Type-C 2.0, OTG',
    usb_version: '2.0',

    // === SENSORS ===
    sensor_fingerprint: 'Under-display, optical',
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,

    // === SOFTWARE ===
    android_version: 'Android 16',
    ui_version: 'OriginOS 6',
    os: 'Android 16, OriginOS 6',

    // === SEO — USA TARGETED, 5 GOLDEN RULES ===
    meta_title: 'iQOO Neo 11 Price & Full Specs 2025 | Snapdragon 8 Elite, 7500mAh',
    meta_description: 'iQOO Neo 11 features Snapdragon 8 Elite, a massive 7500mAh battery with 100W charging, and a 6.82" QHD+ 144Hz AMOLED display. Check full specs & price.',
    keywords: 'iQOO Neo 11 price USA, iQOO Neo 11 specs, iQOO Neo 11 review, Snapdragon 8 Elite phone, 7500mAh battery smartphone 2025',
    seo_overview: 'The **iQOO Neo 11** is a China-exclusive gaming powerhouse that was officially announced and released on **October 30, 2025**, delivering flagship-level performance without the flagship price tag. At its core lies the **Qualcomm Snapdragon 8 Elite (3nm)** chipset, further boosted by the proprietary **iQOO Q2 gaming chip** — a combination that makes it one of the fastest smartphones available in its class. The display is a breathtaking **6.82-inch LTPO AMOLED panel** with a QHD+ (1440 x 3168) resolution and a fluid 144Hz refresh rate, making every game, video, and scroll feel buttery smooth.\n\nThe camera system is led by a **50MP Sony LYT-700V primary sensor** with OIS for consistently sharp and stable photos even in challenging lighting conditions, paired with an 8MP ultrawide lens. Where the iQOO Neo 11 truly differentiates itself is the battery department — a colossal **7,500mAh silicon-carbon battery** keeps the phone running for well over a day, and the included **100W wired fast charger** refills it from zero in around 45 minutes. Durability is covered by an **IP68/IP69 water and dust resistance** rating and a solid metal frame. For US-based buyers, the iQOO Neo 11 is importable and represents exceptional value for its performance tier.',

    verdict: 'The iQOO Neo 11 is built for users who refuse to compromise on either performance or battery life. The Snapdragon 8 Elite paired with the dedicated iQOO Q2 gaming chip makes it a true gaming beast, while the 7500mAh battery ensures you never worry about running out of power mid-session. The 50MP Sony camera delivers reliable results. While it lacks official US availability, savvy buyers who import it will find it to be one of the best performance-per-dollar smartphones of 2025.',

    pros: [
      'Snapdragon 8 Elite + dedicated iQOO Q2 gaming chip for elite performance',
      'Enormous 7500mAh battery with 100W ultra-fast charging',
      '50MP Sony LYT-700V primary camera with OIS',
      'Bright 6.82" QHD+ 144Hz LTPO AMOLED display'
    ],

    cons: [
      'No official US or global release — import only',
      'No wireless charging support',
      'Heavier build at 210g may not suit all users'
    ],

    faqs: [
      {
        question: 'When was the iQOO Neo 11 officially released?',
        answer: 'The iQOO Neo 11 was officially launched in China on October 30, 2025.'
      },
      {
        question: 'What processor does the iQOO Neo 11 use?',
        answer: 'It is powered by the Qualcomm Snapdragon 8 Elite (3nm) chipset, complemented by the iQOO Q2 dedicated gaming chip.'
      },
      {
        question: 'Does the iQOO Neo 11 support wireless charging?',
        answer: 'No, the iQOO Neo 11 does not support wireless charging. It supports 100W wired fast charging only.'
      },
      {
        question: 'Is the iQOO Neo 11 water-resistant?',
        answer: 'Yes, it carries an IP68/IP69 rating, making it resistant to both dust and water immersion.'
      },
      {
        question: 'Is the iQOO Neo 11 available in the USA?',
        answer: 'The iQOO Neo 11 is a China-exclusive model with no official US launch. US buyers can import it from third-party retailers.'
      }
    ],

    // Clean up incorrect leftover fields
    primary_keyword: 'iQOO Neo 11 price specs',
    secondary_keywords: ['iQOO Neo 11 review', 'best gaming phone 2025', '7500mAh battery phone', 'Snapdragon 8 Elite phone'],
    og_title: 'iQOO Neo 11: Snapdragon 8 Elite + 7500mAh Gaming Beast',
    og_description: 'Discover the full specs of the iQOO Neo 11 — Snapdragon 8 Elite, 7500mAh battery, 100W fast charging, and a 144Hz QHD+ AMOLED display.',
    twitter_title: 'iQOO Neo 11 Full Specs & Price',
    twitter_description: 'Snapdragon 8 Elite + 7500mAh + 100W charging. The iQOO Neo 11 is one of 2025\'s best gaming phones.',
    leak_confidence: null,
    launch_quarter: null,
    launch_year: 2025,
    benchmark_highlight: 'AnTuTu 3,000,000+'
  };

  const result = await Phone.updateOne({ slug: 'iqoo-neo-11' }, { $set: update });
  console.log(`iQOO Neo 11 updated. Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);
  await mongoose.disconnect();
}

fix().catch(console.error);
