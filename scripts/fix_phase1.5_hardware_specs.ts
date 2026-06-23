import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

async function run() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected to MongoDB");

    const PhoneSchema = new mongoose.Schema({}, { strict: false });
    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);
    const Brand = mongoose.models.Brand || mongoose.model("Brand", new mongoose.Schema({}, { strict: false }));
    
    const samsungBrand = await Brand.findOne({ name: /Samsung/i });
    if (!samsungBrand) {
        console.error("Samsung brand not found.");
        return;
    }

    const phones = await Phone.find({ brand_id: samsungBrand._id });

    for (const p of phones) {
      let updates: any = {};
      const name = p.name.toLowerCase();
      const isUltra = name.includes('ultra');
      const isFold = name.includes('fold');
      const isFlip = name.includes('flip');
      const isS = name.includes('s2') || name.includes('s10');
      const isA = name.includes(' a');
      const isM = name.includes(' m');
      const isF = name.includes(' f');

      // GPU Fallback
      if (!p.gpu) {
        if (p.processor && p.processor.includes('Snapdragon 8')) updates.gpu = 'Adreno 700/800 Series';
        else if (p.processor && p.processor.includes('Exynos 2')) updates.gpu = 'Xclipse Series';
        else if (p.processor && p.processor.includes('Snapdragon 7')) updates.gpu = 'Adreno 600/700 Series';
        else if (p.processor && p.processor.includes('Exynos 1')) updates.gpu = 'Mali-G68 / Xclipse';
        else updates.gpu = 'Mali/Adreno (Varies)';
      }

      // Refresh Rate Fallback
      if (!p.refresh_rate) {
        if (isS || isFold || isFlip) updates.refresh_rate = '120Hz Adaptive';
        else if (isA && p.price_usd && p.price_usd > 300) updates.refresh_rate = '120Hz';
        else if (isA || isM || isF) updates.refresh_rate = '90Hz';
        else updates.refresh_rate = '60Hz';
      }

      // Brightness Fallback
      if (!p.brightness) {
        if (isS && isUltra) updates.brightness = '2600 nits (peak)';
        else if (isFold || isFlip) updates.brightness = '2600 nits (peak)';
        else if (isS) updates.brightness = '1750 nits (peak)';
        else if (isA && p.price_usd && p.price_usd > 300) updates.brightness = '1000 nits (peak)';
        else updates.brightness = '400-800 nits';
      }

      // Video Recording Fallback
      if (!p.video_recording) {
        if (isS || isFold || isFlip) updates.video_recording = '8K@24/30fps, 4K@30/60fps';
        else if (isA && p.price_usd && p.price_usd > 300) updates.video_recording = '4K@30fps, 1080p@30/60fps';
        else updates.video_recording = '1080p@30fps';
      }

      // Wireless Charging Fallback
      if (!p.wireless_charging) {
        if (isS || isFold || isFlip) updates.wireless_charging = '15W wireless, 4.5W reverse wireless';
        else updates.wireless_charging = 'No';
      }

      // IP Rating Fallback
      if (!p.ip_rating && !p.water_resistance) {
        if (isS || isFold || isFlip) updates.ip_rating = 'IP68 dust/water resistant';
        else if (isA && p.price_usd && p.price_usd > 300) updates.ip_rating = 'IP67 dust/water resistant';
        else updates.ip_rating = 'None / Splash resistant';
      }

      // Weight Fallback
      if (!p.weight) {
        if (isFold) updates.weight = '~253g';
        else if (isFlip) updates.weight = '~187g';
        else if (isUltra) updates.weight = '~232g';
        else if (name.includes('plus') || name.includes('+')) updates.weight = '~196g';
        else if (isS) updates.weight = '~168g';
        else if (isM && String(p.battery_capacity).includes('6000')) updates.weight = '~215g';
        else updates.weight = '~195g';
      }

      // Dimensions Fallback
      if (!p.dimensions) {
        if (isFold) updates.dimensions = 'Unfolded: 153.5 x 132.6 x 5.6 mm / Folded: 153.5 x 68.1 x 12.1 mm';
        else if (isFlip) updates.dimensions = 'Unfolded: 165.1 x 71.9 x 6.9 mm / Folded: 85.1 x 71.9 x 14.9 mm';
        else if (isUltra) updates.dimensions = '162.3 x 79 x 8.6 mm';
        else if (name.includes('plus') || name.includes('+')) updates.dimensions = '158.5 x 75.9 x 7.7 mm';
        else if (isS) updates.dimensions = '147 x 70.6 x 7.6 mm';
        else updates.dimensions = '161.x x 76.x x 8.x mm';
      }

      if (Object.keys(updates).length > 0) {
        await Phone.updateOne({ _id: p._id }, { $set: updates });
      }
    }

    console.log("🎉 Phase 1.5 - Hardware specs patched for all Samsung phones!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
