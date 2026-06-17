import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';
process.env.MONGODB_URI = process.env.MONGODB_URI;

async function publish() {
  const { default: connectToDatabase } = await import('../src/lib/mongodb/mongoose');
  const { default: Brand } = await import('../src/lib/models/Brand');
  const { default: Phone } = await import('../src/lib/models/Phone');

  await connectToDatabase();

  let brand = await Brand.findOne({ slug: 'xiaomi' });
  if (!brand) {
    brand = await Brand.create({ name: 'Xiaomi', slug: 'xiaomi' });
  }

  const phoneData = {
    name: 'Xiaomi 18 Pro Max',
    slug: 'xiaomi-18-pro-max',
    brand_id: brand._id,
    is_published: true,
    is_featured: true,
    upcoming: true,
    price_usd: 1299,
    release_date: 'Expected Q3 2026',
    
    // Highlights
    chipset_highlight: 'Snapdragon 8 Elite Gen 6 Pro (2nm)',
    camera_highlight: 'Dual 200MP + 50MP Ultrawide',
    display_highlight: '6.9" 2K LIPO OLED, 144Hz',
    battery_highlight: '8500mAh, 120W Wired, 80W Wireless',
    
    // Display Section
    display_type: 'LTPO 4.0 AMOLED, 68B colors, Dolby Vision, HDR10+',
    screen_size: '6.9 inches',
    resolution: '3200 x 1440 pixels',
    refresh_rate: '144Hz Adaptive',
    brightness: '6000 nits (peak)',
    protection: 'Xiaomi Dragon Crystal Glass 3.0',
    
    // Performance Section
    cpu: 'Octa-core Custom Oryon',
    gpu: 'Adreno 840',
    fabrication: '2nm TSMC',
    ram_variants: '12GB, 16GB, 24GB',
    storage_variants: '256GB, 512GB, 1TB, 2TB',
    storage_type: 'UFS 5.0',
    
    // Cameras
    cam_count: 'Quad Camera',
    cam_main_sensor: '200 MP, f/1.4-f/4.0 (wide), 1/1.28", LOFIC, OIS',
    cam_telephoto: '200 MP, f/2.4 (periscope telephoto), 1/1.56", 3x optical, OIS',
    cam_ultrawide: '50 MP, f/2.0, 122˚',
    cam_video: '8K@30fps, 4K@24/30/60/120fps, 10-bit LOG',
    
    cam_front_resolution: '50 MP, f/2.0 (wide)',
    cam_front_video: '4K@60fps, 1080p@60fps',
    
    // Battery
    battery_capacity: '8500 mAh, Silicon-Carbon',
    charging_wired: '120W wired',
    charging_wireless: '80W wireless',
    charging_reverse: '10W reverse wireless',
    
    // General
    has_5g: true,
    wifi_version: 'Wi-Fi 8',
    bluetooth_version: '5.5, aptX Lossless',
    has_nfc: true,
    usb_version: 'USB Type-C 4.0, DisplayPort',
    
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351cb315?q=80&w=2000'], // placeholder
    
    meta_title: 'Xiaomi 18 Pro Max Specs, Price, and Leaks',
    meta_description: 'Discover the upcoming Xiaomi 18 Pro Max features, Dual 200MP camera, 8500mAh battery, and Snapdragon 8 Elite Gen 6 processor.',
  };

  await Phone.findOneAndUpdate(
    { slug: 'xiaomi-18-pro-max' },
    phoneData,
    { upsert: true, new: true }
  );

  console.log('Successfully published Xiaomi 18 Pro Max');
  process.exit(0);
}

publish().catch(console.error);
