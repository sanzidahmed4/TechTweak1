const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function insertPhone() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  const Brand = mongoose.model('Brand', new mongoose.Schema({}, { strict: false }));

  const vivoBrand = await Brand.findOne({ slug: 'vivo' });

  const phoneData = {
    name: 'Vivo X200 Ultra',
    slug: 'vivo-x200-ultra',
    brand_id: vivoBrand._id,
    phone_status: 'released',
    is_official: true,
    release_date: '2025-04-29',
    expected_launch_date: '',
    price_usd: 1199,
    price_display_text: '$1199',
    display_price: '$1199',
    price: 1199,
    is_published: true,
    
    // Hardware Specs
    display_type: 'LTPO AMOLED, 1B colors, 120Hz, Dolby Vision, HDR Vivid, 4500 nits (peak)',
    screen_size: '6.82 inches',
    resolution: '1440 x 3168 pixels',
    protection: 'Armor Glass',
    processor: 'Qualcomm Snapdragon 8 Elite (3 nm)',
    gpu: 'Adreno 830',
    ram_variants: '12GB, 16GB',
    storage_variants: '256GB, 512GB, 1TB',
    storage_type: 'UFS 4.1',
    cam_main_sensor: '50 MP, f/1.7, 35mm (wide), Gimbal OIS',
    cam_telephoto: '200 MP, f/2.3, 85mm (periscope), 3.7x optical zoom',
    cam_ultrawide: '50 MP, f/2.0, 14mm, 116˚',
    cam_front_resolution: '50 MP, f/2.5, 24mm (wide)',
    battery_capacity: '6000 mAh (Si/C Li-Ion)',
    charging_wired: '90W wired',
    charging_wireless: '40W wireless, reverse charging',
    dimensions: '163.1 x 76.8 x 8.7 mm',
    weight: '229 g',
    ip_rating: 'IP69/IP68 dust/water resistant',
    network: 'GSM / CDMA / HSPA / CDMA2000 / LTE / 5G',
    sim_type: 'Dual SIM (Nano-SIM, dual stand-by)',
    os: 'Android 15, OriginOS 5',

    // SEO
    meta_title: 'Vivo X200 Ultra Price in USA 2026 | Full Specs & Review',
    meta_description: 'Discover the official USA price of the Vivo X200 Ultra. Explore its Snapdragon 8 Elite processor, 200MP camera, 6000 mAh battery, and full specs.',
    keywords: 'Vivo X200 Ultra price USA, Vivo X200 Ultra specs, buy Vivo X200 Ultra, Snapdragon 8 Elite phones, best camera phone 2026',
    seo_overview: 'The **Vivo X200 Ultra** redefines the premium smartphone experience for the US market, bringing unprecedented performance and a revolutionary camera system. At the core of this flagship is the cutting-edge **Qualcomm Snapdragon 8 Elite (3 nm)** processor, delivering unparalleled speed and efficiency for intensive gaming and heavy multitasking. The visually stunning **6.82-inch LTPO AMOLED display** features a 120Hz refresh rate and a breathtaking peak brightness of 4500 nits, ensuring crystal-clear visibility in direct sunlight. Photography enthusiasts will be blown away by the triple camera setup co-engineered with Zeiss, featuring a massive **200 MP periscope telephoto lens** and a 50 MP primary sensor with Gimbal OIS. Whether you are shooting 4K cinematic videos or capturing ultra-detailed macros, the X200 Ultra excels in every scenario. Furthermore, the massive **6000 mAh battery** guarantees all-day endurance, supported by incredibly fast 90W wired and 40W wireless charging. With an IP69 rating and durable Armor Glass, the Vivo X200 Ultra is built to withstand extreme conditions while looking incredibly sleek.',
    verdict: 'The Vivo X200 Ultra is an exceptional choice for tech enthusiasts and mobile photographers in the USA who refuse to compromise. If you demand industry-leading battery life, a top-tier Snapdragon 8 Elite chipset, and one of the most advanced telephoto cameras ever put into a smartphone, this device justifies its premium price tag. While the absence of a microSD slot and its heavier build might deter some, its overall package is practically flawless. We highly recommend the X200 Ultra to power users seeking the ultimate Android flagship experience.',
    
    pros: [
      'Cutting-edge Snapdragon 8 Elite processor',
      'Revolutionary 200 MP periscope telephoto camera',
      'Massive 6000 mAh battery with 90W fast charging',
      'Extremely bright 4500 nits AMOLED display'
    ],
    cons: [
      'No expandable storage via microSD card',
      'Device is relatively heavy at 229g',
      'Premium price tag may not suit budget buyers'
    ],
    faqs: [
      {
        question: 'Does the Vivo X200 Ultra support wireless charging?',
        answer: 'Yes, it supports impressive 40W fast wireless charging along with 90W wired charging.'
      },
      {
        question: 'Is the Vivo X200 Ultra water-resistant?',
        answer: 'Yes, it features an IP69/IP68 rating, making it highly resistant to dust and water (up to 1.5m for 30 mins).'
      },
      {
        question: 'What processor is used in the Vivo X200 Ultra?',
        answer: 'It is powered by the top-tier Qualcomm Snapdragon 8 Elite (3 nm) chipset.'
      },
      {
        question: 'Does the Vivo X200 Ultra have a headphone jack?',
        answer: 'No, like most modern flagships, it does not include a 3.5mm audio jack.'
      },
      {
        question: 'What is the optical zoom capability of the camera?',
        answer: 'The 200 MP periscope telephoto lens provides 3.7x optical zoom.'
      }
    ]
  };

  await Phone.updateOne({ slug: phoneData.slug }, { $set: phoneData }, { upsert: true });

  console.log('Successfully inserted Vivo X200 Ultra');
  await mongoose.disconnect();
}

insertPhone().catch(console.error);
