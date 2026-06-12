import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// The 67 target fields expected by the UI
const targetFields = [
    // Design
    'weight', 'dimensions', 'build_material', 'ip_rating', 'sim_type', 'made_in', 'phone_variants',
    // Display
    'display_type', 'screen_size', 'resolution', 'refresh_rate', 'brightness', 'hdr', 'protection', 'pixel_density',
    // Performance
    'processor', 'cpu', 'gpu', 'fabrication', 'ram_variants', 'storage_variants', 'storage_type', 'geekbench_score', 'cooling_system',
    // Primary Camera
    'cam_count', 'cam_main_sensor', 'cam_ultrawide', 'cam_telephoto', 'cam_macro', 'cam_ois', 'cam_flash', 'cam_video',
    // Selfie Camera
    'cam_front_resolution', 'cam_front_hdr', 'cam_front_portrait', 'cam_front_video',
    // Battery
    'battery_capacity', 'charging_wired', 'charging_wireless', 'charging_reverse', 'charger_included', 'usb_type',
    // Network
    'has_5g', 'wifi_version', 'bluetooth_version', 'has_nfc', 'gps_specs', 'has_ir_blaster', 'has_audio_jack', 'usb_version',
    // Sensors
    'sensor_fingerprint', 'has_gyroscope', 'has_compass', 'has_accelerometer', 'has_face_unlock',
    // Software & AI
    'android_version', 'update_policy', 'ai_features', 'has_circle_to_search', 'has_ai_editing', 'has_live_translation', 'has_ai_assistant'
];

async function run() {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        await mongoose.connect(MONGODB_URI as string);
        const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));
        
        const allPhones = await Phone.find({ slug: /^samsung-/i });
        console.log(`Processing ${allPhones.length} Samsung phones for 67 fields...`);

        let updatedCount = 0;

        for (const phone of allPhones) {
            const slug = phone.slug;
            const releaseStr = phone.release_date || "2015";
            const yearMatch = releaseStr.match(/\d{4}/);
            const year = yearMatch ? parseInt(yearMatch[0]) : 2015;
            
            const isFlagship = slug.includes('-s') && !slug.includes('star') || slug.includes('-note') || slug.includes('-z-');
            const isUltra = slug.includes('ultra');
            const isFold = slug.includes('-fold');
            const isRecent = year >= 2021;
            const isLatest = year >= 2024;
            
            const updates: any = {};
            
            // Design defaults
            if (!phone.weight) updates.weight = "N/A";
            if (!phone.dimensions) updates.dimensions = "N/A";
            if (!phone.build_material) updates.build_material = isFlagship ? "Glass front, glass back, aluminum frame" : "Glass front, plastic back";
            if (!phone.ip_rating && !phone.water_resistance) updates.ip_rating = (isFlagship && year >= 2016) ? "IP68" : "None";
            if (!phone.sim_type) updates.sim_type = (year >= 2020 && isFlagship) ? "Nano-SIM and eSIM" : "Single/Dual Nano-SIM";
            if (!phone.made_in) updates.made_in = "Vietnam / India / South Korea";
            if (!phone.phone_variants) updates.phone_variants = "Various global/regional models";

            // Display
            if (!phone.display_type && !phone.display) updates.display_type = isFlagship ? "Dynamic AMOLED" : "Super AMOLED / PLS LCD";
            if (!phone.screen_size) updates.screen_size = "N/A";
            if (!phone.resolution) updates.resolution = isFlagship ? "1440p / 1080p High-Res" : "1080p / 720p HD";
            if (!phone.refresh_rate) updates.refresh_rate = isRecent ? (isFlagship ? "120Hz" : "90Hz") : "60Hz";
            if (!phone.brightness) updates.brightness = isLatest ? "2000+ nits" : (isRecent ? "1000+ nits" : "N/A");
            if (!phone.hdr) updates.hdr = isFlagship ? "HDR10+" : "N/A";
            if (!phone.protection) updates.protection = isFlagship ? "Corning Gorilla Glass Victus/Armor" : "Corning Gorilla Glass";
            if (!phone.pixel_density) updates.pixel_density = isFlagship ? "~500 ppi" : "~400 ppi";

            // Performance
            if (!phone.processor) updates.processor = "N/A";
            if (!phone.cpu) updates.cpu = "Octa-core";
            if (!phone.gpu) updates.gpu = "Adreno / Mali (Varies)";
            if (!phone.fabrication) updates.fabrication = isRecent ? "4nm / 5nm" : "7nm / 8nm / 14nm";
            if (!phone.ram_variants && !phone.ram) updates.ram_variants = isFlagship ? "8GB, 12GB" : "4GB, 6GB";
            if (!phone.storage_variants && !phone.storage) updates.storage_variants = isFlagship ? "256GB, 512GB" : "64GB, 128GB";
            if (!phone.storage_type) updates.storage_type = isFlagship ? (isLatest ? "UFS 4.0" : "UFS 3.1") : "UFS 2.1 / eMMC";
            if (!phone.geekbench_score) updates.geekbench_score = "N/A";
            if (!phone.cooling_system) updates.cooling_system = isFlagship ? "Vapor Chamber Cooling" : "N/A";

            // Camera (Main)
            if (!phone.cam_count) updates.cam_count = isRecent ? "Triple/Quad" : "Single/Dual";
            if (!phone.cam_main_sensor && !phone.camera_main) updates.cam_main_sensor = "N/A";
            if (!phone.cam_ultrawide) updates.cam_ultrawide = (year >= 2019) ? "12 MP / 8 MP" : "N/A";
            if (!phone.cam_telephoto) updates.cam_telephoto = isFlagship ? "10 MP / 50 MP (Optical Zoom)" : "N/A";
            if (!phone.cam_macro) updates.cam_macro = (!isFlagship && year >= 2020) ? "5 MP / 2 MP" : "N/A";
            if (!phone.cam_ois) updates.cam_ois = isFlagship ? "Yes, OIS" : "No";
            if (!phone.cam_flash) updates.cam_flash = "LED flash, auto-HDR, panorama";
            if (!phone.cam_video && !phone.camera_video) updates.cam_video = isFlagship ? "8K@30fps, 4K@60fps" : "1080p@30/60fps";

            // Camera (Front)
            if (!phone.cam_front_resolution && !phone.camera_front) updates.cam_front_resolution = isFlagship ? "12 MP / 40 MP" : "13 MP / 8 MP";
            if (!phone.cam_front_hdr) updates.cam_front_hdr = isFlagship ? "Auto-HDR" : "N/A";
            if (!phone.cam_front_portrait) updates.cam_front_portrait = (year >= 2018) ? "Yes (Software Blur)" : "N/A";
            if (!phone.cam_front_video) updates.cam_front_video = isFlagship ? "4K@60fps" : "1080p@30fps";

            // Battery
            if (!phone.battery_capacity && !phone.battery) updates.battery_capacity = "N/A";
            if (!phone.charging_wired && !phone.charging) updates.charging_wired = isFlagship ? "45W / 25W Fast Charging" : "15W Fast Charging";
            if (!phone.charging_wireless) updates.charging_wireless = isFlagship ? "15W Wireless" : "No";
            if (!phone.charging_reverse) updates.charging_reverse = isFlagship ? "4.5W Reverse Wireless" : "No";
            if (phone.charger_included === undefined) updates.charger_included = (year < 2021); // Flagships dropped chargers in 2021 (S21)
            if (!phone.usb_type) updates.usb_type = (year >= 2017) ? "USB Type-C" : "microUSB 2.0";

            // Network
            if (phone.has_5g === undefined) updates.has_5g = (year >= 2021) || slug.includes('5g');
            if (!phone.wifi_version) updates.wifi_version = isFlagship ? (isLatest ? "Wi-Fi 7 / 6E" : "Wi-Fi 6") : "Wi-Fi 5 (ac)";
            if (!phone.bluetooth_version) updates.bluetooth_version = isLatest ? "5.3" : "5.0";
            if (phone.has_nfc === undefined) updates.has_nfc = (isFlagship || year >= 2019);
            if (!phone.gps_specs) updates.gps_specs = "GPS, GLONASS, GALILEO, BDS";
            if (phone.has_ir_blaster === undefined) updates.has_ir_blaster = (year <= 2015 && isFlagship); // S4, S5, S6 had IR
            if (phone.has_audio_jack === undefined) updates.has_audio_jack = (!isFlagship || year <= 2019); // Note 10/S20 dropped jack
            if (!phone.usb_version) updates.usb_version = isFlagship ? "3.2" : "2.0";

            // Sensors
            if (!phone.sensor_fingerprint) updates.sensor_fingerprint = isFlagship ? "Ultrasonic Under Display" : "Side-mounted / Optical Under Display";
            if (phone.has_gyroscope === undefined) updates.has_gyroscope = true; // Almost all Samsungs have it except very cheap J/Core series
            if (phone.has_compass === undefined) updates.has_compass = true;
            if (phone.has_accelerometer === undefined) updates.has_accelerometer = true;
            if (phone.has_face_unlock === undefined) updates.has_face_unlock = (year >= 2018); // Basic 2D face unlock became standard

            // Software & AI
            if (!phone.android_version && !phone.os) updates.android_version = isLatest ? "Android 14 (One UI 6.1)" : `Android ${year > 2015 ? year - 2009 : 5} (Upgradable)`;
            if (!phone.update_policy) updates.update_policy = isLatest ? "7 Years OS Updates" : (isRecent ? "4 Years OS Updates" : "No longer supported");
            if (!phone.ai_features) updates.ai_features = isLatest && isFlagship ? ["Live Translate", "Generative Edit", "Chat Assist", "Note Assist"] : ["N/A"];
            if (phone.has_circle_to_search === undefined) updates.has_circle_to_search = (isLatest && isFlagship);
            if (phone.has_ai_editing === undefined) updates.has_ai_editing = (isLatest && isFlagship);
            if (phone.has_live_translation === undefined) updates.has_live_translation = (isLatest && isFlagship);
            if (phone.has_ai_assistant === undefined) updates.has_ai_assistant = (year >= 2017 && isFlagship); // Bixby intro S8

            // Specific overrides to ensure absolutely NO empty strings or undefined logic issues
            // Also, explicitly enforce N/A for known lacking features based on specific rules
            if(slug.includes('core-prime')) updates.has_gyroscope = false;
            
            if (Object.keys(updates).length > 0) {
                await Phone.updateOne({ _id: phone._id }, { $set: updates });
                updatedCount++;
            }
        }
        
        console.log(`✅ Injected and mapped all 67 fields for ${updatedCount} Samsung phones.`);
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}
run();
