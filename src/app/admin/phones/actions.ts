"use server";

import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";
import ActivityLog from "@/lib/models/ActivityLog";
import { revalidatePath, revalidateTag } from "next/cache";
import slugify from "slugify";
import { redirect } from "next/navigation";

function parseSafeNumber(value: any /* eslint-disable-line @typescript-eslint/no-explicit-any */): number | null {
  if (!value) return null;
  if (typeof value === "number") return value;
  // Extract numbers, negative sign, and decimal point
  const cleanVal = (value as string).replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleanVal);
  return isNaN(parsed) ? null : parsed;
}

function parseReleaseDate(dateStr: string | null | undefined): Date | null {
  if (!dateStr || dateStr.trim() === "") return null;
  
  const cleanStr = dateStr.replace(/exp\.|expected|announced/i, '').trim();

  const parsed = new Date(cleanStr);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }

  const commaMatch = cleanStr.match(/^(\d{4}),\s*([a-zA-Z]+)$/);
  if (commaMatch) {
    const parsedComma = new Date(`${commaMatch[2]} ${commaMatch[1]}`);
    if (!isNaN(parsedComma.getTime())) return parsedComma;
  }

  if (/^\d{4}$/.test(cleanStr)) {
    return new Date(`${cleanStr}-01-01`);
  }

  return null;
}

export async function addPhone(formData: FormData) {
  await connectToDatabase();

  const name = formData.get("name") as string;
  const brand_id = formData.get("brand_id") as string;
  
  // Automatic slug generation if not provided
  let slug = formData.get("slug") as string;
  if (!slug) {
    slug = slugify(name, { lower: true, strict: true });
  }

  // Parse images from external folder paths or Cloudinary urls
  const imagesRaw = formData.get("images") as string;
  const images = imagesRaw 
    ? (imagesRaw.includes("|") 
        ? imagesRaw.split("|") 
        : imagesRaw.split(","))
        .map(img => img.trim()).filter(Boolean) 
    : [];

  // Parse arrays
  const colorsRaw = formData.get("colors") as string;
  const colors = colorsRaw ? colorsRaw.split(",").map(c => c.trim()).filter(Boolean) : [];

  const aiFeaturesRaw = formData.get("ai_features") as string;
  const ai_features = aiFeaturesRaw ? aiFeaturesRaw.split(",").map(f => f.trim()).filter(Boolean) : [];

  // Auto-generate helper will run before saving

  // Old fields backward compatibility mapping
  const cpu = formData.get("cpu") as string;
  const ram_variants = formData.get("ram_variants") as string;
  const storage_variants = formData.get("storage_variants") as string;
  const display_type = formData.get("display_type") as string;
  const screen_size = formData.get("screen_size") as string;
  const cam_main_sensor = formData.get("cam_main_sensor") as string;
  const cam_front_resolution = formData.get("cam_front_resolution") as string;
  const battery_capacity = formData.get("battery_capacity") as string;
  const charging_wired = formData.get("charging_wired") as string;
  const has_5g = formData.get("has_5g") === "on";
  const has_audio_jack = formData.get("has_audio_jack") === "on";

  const processor = cpu || (formData.get("chipset_highlight") as string);
  const ram = ram_variants;
  const storage = storage_variants;
  const display = `${screen_size || ""} ${display_type || ""}`.trim() || (formData.get("display_highlight") as string);
  const camera_main = cam_main_sensor || (formData.get("camera_highlight") as string);
  const camera_front = cam_front_resolution || (formData.get("camera_front") as string);
  const battery = battery_capacity || (formData.get("battery_highlight") as string);
  const charging = charging_wired || (formData.get("charging") as string);
  const network = has_5g ? "5G Network" : "4G LTE";

  const phoneData = {
    name,
    slug,
    brand_id,
    is_published: formData.get("is_published") === "on",
    is_featured: formData.get("is_featured") === "on",
    upcoming: formData.get("upcoming") === "on", // legacy
    phone_status: formData.get("phone_status") as string || "released",
    
    // New Ecosystem Fields
    price_display_text: formData.get("price_display_text") as string,
    price_status: formData.get("price_status") as string || "official",
    expected_launch_date: formData.get("expected_launch_date") as string,
    launch_quarter: formData.get("launch_quarter") as string,
    launch_year: parseSafeNumber(formData.get("launch_year")),
    leak_confidence: formData.get("leak_confidence") as string,

    is_official: formData.get("is_official") === "on",
    release_date: formData.get("release_date") || null,
    release_date_parsed: parseReleaseDate(formData.get("release_date") as string),
    colors,
    pros: [] as string[],
    cons: [] as string[],
    faqs: [] as any /* eslint-disable-line @typescript-eslint/no-explicit-any */[],
    model_number: formData.get("model_number") as string,
    phone_variants: formData.get("phone_variants") as string,
    made_in: formData.get("made_in") as string,
    images,
    
    // Quick Highlights
    chipset_highlight: formData.get("chipset_highlight") as string,
    camera_highlight: formData.get("camera_highlight") as string,
    display_highlight: formData.get("display_highlight") as string,
    battery_highlight: formData.get("battery_highlight") as string,
    benchmark_highlight: formData.get("benchmark_highlight") as string,

    // Old fallbacks
    processor,
    ram,
    storage,
    display,
    camera_main,
    camera_front,
    battery,
    charging,
    network,
    antutu_score: parseSafeNumber(formData.get("antutu_score")),
    price_usd: parseSafeNumber(formData.get("price_usd")),
    price_official: parseSafeNumber(formData.get("price_usd")),
    price_unofficial: parseSafeNumber(formData.get("price_unofficial")),

    // General Info
    weight: formData.get("weight") as string,
    dimensions: formData.get("dimensions") as string,
    build_material: formData.get("build_material") as string,
    sim_type: formData.get("sim_type") as string,
    water_resistance: formData.get("water_resistance") as string,

    // Display
    display_type,
    screen_size,
    resolution: formData.get("resolution") as string,
    refresh_rate: formData.get("refresh_rate") as string,
    brightness: formData.get("brightness") as string,
    hdr: formData.get("hdr") as string,
    protection: formData.get("protection") as string,
    pixel_density: formData.get("pixel_density") as string,

    // Performance
    cpu,
    gpu: formData.get("gpu") as string,
    fabrication: formData.get("fabrication") as string,
    ram_variants,
    storage_variants,
    storage_type: formData.get("storage_type") as string,
    geekbench_score: formData.get("geekbench_score") as string,
    cooling_system: formData.get("cooling_system") as string,

    // Primary Camera
    cam_count: formData.get("cam_count") as string,
    cam_main_sensor,
    cam_ultrawide: formData.get("cam_ultrawide") as string,
    cam_telephoto: formData.get("cam_telephoto") as string,
    cam_macro: formData.get("cam_macro") as string,
    cam_ois: formData.get("cam_ois") as string,
    cam_flash: formData.get("cam_flash") as string,
    cam_video: formData.get("cam_video") as string,

    // Front Camera
    cam_front_resolution,
    cam_front_hdr: formData.get("cam_front_hdr") as string,
    cam_front_portrait: formData.get("cam_front_portrait") as string,
    cam_front_video: formData.get("cam_front_video") as string,

    // Battery & Charging
    battery_capacity,
    charging_wired,
    charging_wireless: formData.get("charging_wireless") as string,
    charging_reverse: formData.get("charging_reverse") as string,
    charger_included: formData.get("charger_included") === "on",
    usb_type: formData.get("usb_type") as string,

    // Network & Connectivity
    has_5g,
    wifi_version: formData.get("wifi_version") as string,
    bluetooth_version: formData.get("bluetooth_version") as string,
    has_nfc: formData.get("has_nfc") === "on",
    gps_specs: formData.get("gps_specs") as string,
    has_ir_blaster: formData.get("has_ir_blaster") === "on",
    has_audio_jack,
    usb_version: formData.get("usb_version") as string,

    // Sensors
    sensor_fingerprint: formData.get("sensor_fingerprint") as string,
    has_gyroscope: formData.get("has_gyroscope") === "on",
    has_compass: formData.get("has_compass") === "on",
    has_accelerometer: formData.get("has_accelerometer") === "on",
    has_face_unlock: formData.get("has_face_unlock") === "on",

    // Software & AI
    android_version: formData.get("android_version") as string,
    ui_version: formData.get("ui_version") as string,
    update_policy: formData.get("update_policy") as string,
    ai_features,
    has_circle_to_search: formData.get("has_circle_to_search") === "on",
    has_ai_editing: formData.get("has_ai_editing") === "on",
    has_live_translation: formData.get("has_live_translation") === "on",
    has_ai_assistant: formData.get("has_ai_assistant") === "on",

    // Removed manual related IDs reading, left empty to let frontend auto-suggest
    related_similar_ids: [],
    related_compare_ids: [],
    related_better_ids: [],
  };

  // Auto-generate Pros, Cons, FAQs based on specs
  const autoPros: string[] = [];
  const autoCons: string[] = [];
  const autoFaqs: any /* eslint-disable-line @typescript-eslint/no-explicit-any */[] = [];

  const nfc = formData.get("has_nfc") === "on";
  const storage_type = formData.get("storage_type") as string;

  if (has_5g) autoPros.push("Supports Latest 5G Network");
  if (nfc) autoPros.push("NFC support for contactless payments");
  
  const parsedBattery = battery_capacity ? parseSafeNumber(battery_capacity) : null;
  if (parsedBattery && parsedBattery >= 5000) autoPros.push(`Large ${battery_capacity} Battery for all-day use`);
  
  if (display_type && (display_type.toLowerCase().includes('amoled') || display_type.toLowerCase().includes('oled'))) autoPros.push("Vibrant and crisp AMOLED/OLED display");
  if (display_type && display_type.toLowerCase().includes('ltpo')) autoPros.push("LTPO technology for better battery efficiency");
  
  const refreshRateRaw = formData.get("refresh_rate") as string;
  const parsedRefresh = refreshRateRaw ? parseSafeNumber(refreshRateRaw) : null;
  if (parsedRefresh && parsedRefresh >= 120) autoPros.push("Smooth 120Hz+ High Refresh Rate Screen");
  
  const parsedCam = cam_main_sensor ? parseSafeNumber(cam_main_sensor) : null;
  if (parsedCam && parsedCam >= 50) autoPros.push(`High resolution ${parsedCam}MP Main Camera`);
  if (cam_main_sensor && cam_main_sensor.toLowerCase().includes('ois')) autoPros.push("Optical Image Stabilization (OIS) for steady shots");
  
  const water_res = formData.get("water_resistance") as string;
  if (water_res && water_res.includes("IP68")) autoPros.push("IP68 Water and Dust Resistant");
  
  if (storage_type && (storage_type.includes("UFS 4.0") || storage_type.includes("NVMe"))) autoPros.push("Ultra-fast UFS 4.0 / NVMe storage");
  
  const charger_included = formData.get("charger_included") === "on";
  if (!charger_included) autoCons.push("Charging adapter is not included in the box");
  if (!has_audio_jack) autoCons.push("Lacks a 3.5mm headphone jack");
  
  const weightRaw = formData.get("weight") as string;
  const parsedWeight = weightRaw ? parseSafeNumber(weightRaw) : null;
  if (parsedWeight && parsedWeight >= 210) autoCons.push("Device is relatively heavy");
  if (parsedWeight && parsedWeight < 170) autoPros.push("Lightweight and comfortable to hold");

  if (charging_wired) autoFaqs.push({ question: "Does it support fast charging?", answer: `Yes, it supports ${charging_wired}.` });
  if (has_5g) autoFaqs.push({ question: "Does this smartphone support 5G?", answer: "Yes, it is fully compatible with 5G networks for high-speed internet." });
  autoFaqs.push({ question: "Is the charger included in the box?", answer: charger_included ? "Yes, a compatible charging adapter is included in the retail box." : "No, the retail box only contains the phone and a cable. The charging brick must be purchased separately." });
  if (water_res) autoFaqs.push({ question: "Is this phone water-resistant?", answer: water_res });
  
  const made_in = formData.get("made_in") as string;
  if (made_in) autoFaqs.push({ question: "Where is this phone manufactured?", answer: `This device is manufactured in ${made_in}.` });

  phoneData.pros = autoPros;
  phoneData.cons = autoCons;
  phoneData.faqs = autoFaqs;

  try {
    await Phone.create(phoneData);
    
    // Log activity
    await ActivityLog.create({
      title: `Added new phone: ${name}`,
      type: 'Phone',
      action: 'Create',
      icon: 'Smartphone',
      color: 'text-blue-500 bg-blue-50',
    });
  } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
    console.error("Error inserting phone:", error);
    throw new Error(error.message);
  }

  // Automatic Brand Routing & SEO revalidation
  revalidatePath("/");
  revalidatePath("/phones");
  revalidatePath("/compare");
  revalidatePath("/phones/[brand]", "page");
  revalidateTag("phones", "max");
  revalidateTag("featured-phones", "max");
  revalidateTag("upcoming-phones", "max");

  redirect("/admin/phones");
}

export async function editPhone(id: string, formData: FormData) {
  await connectToDatabase();

  const name = formData.get("name") as string;
  const brand_id = formData.get("brand_id") as string;
  
  let slug = formData.get("slug") as string;
  if (!slug) {
    slug = slugify(name, { lower: true, strict: true });
  }

  const imagesRaw = formData.get("images") as string;
  const images = imagesRaw 
    ? (imagesRaw.includes("|") 
        ? imagesRaw.split("|") 
        : imagesRaw.split(","))
        .map(img => img.trim()).filter(Boolean) 
    : [];

  const colorsRaw = formData.get("colors") as string;
  const colors = colorsRaw ? colorsRaw.split(",").map(c => c.trim()).filter(Boolean) : [];

  const aiFeaturesRaw = formData.get("ai_features") as string;
  const ai_features = aiFeaturesRaw ? aiFeaturesRaw.split(",").map(f => f.trim()).filter(Boolean) : [];

  // Auto-generate helper will run before saving

  const cpu = formData.get("cpu") as string;
  const ram_variants = formData.get("ram_variants") as string;
  const storage_variants = formData.get("storage_variants") as string;
  const display_type = formData.get("display_type") as string;
  const screen_size = formData.get("screen_size") as string;
  const cam_main_sensor = formData.get("cam_main_sensor") as string;
  const cam_front_resolution = formData.get("cam_front_resolution") as string;
  const battery_capacity = formData.get("battery_capacity") as string;
  const charging_wired = formData.get("charging_wired") as string;
  const has_5g = formData.get("has_5g") === "on";
  const has_audio_jack = formData.get("has_audio_jack") === "on";

  const processor = cpu || (formData.get("chipset_highlight") as string);
  const ram = ram_variants;
  const storage = storage_variants;
  const display = `${screen_size || ""} ${display_type || ""}`.trim() || (formData.get("display_highlight") as string);
  const camera_main = cam_main_sensor || (formData.get("camera_highlight") as string);
  const camera_front = cam_front_resolution || (formData.get("camera_front") as string);
  const battery = battery_capacity || (formData.get("battery_highlight") as string);
  const charging = charging_wired || (formData.get("charging") as string);
  const network = has_5g ? "5G Network" : "4G LTE";

  const phoneData = {
    name,
    slug,
    brand_id,
    is_published: formData.get("is_published") === "on",
    is_featured: formData.get("is_featured") === "on",
    upcoming: formData.get("upcoming") === "on", // legacy
    phone_status: formData.get("phone_status") as string || "released",
    
    // New Ecosystem Fields
    price_display_text: formData.get("price_display_text") as string,
    price_status: formData.get("price_status") as string || "official",
    expected_launch_date: formData.get("expected_launch_date") as string,
    launch_quarter: formData.get("launch_quarter") as string,
    launch_year: parseSafeNumber(formData.get("launch_year")),
    leak_confidence: formData.get("leak_confidence") as string,

    is_official: formData.get("is_official") === "on",
    release_date: formData.get("release_date") || null,
    release_date_parsed: parseReleaseDate(formData.get("release_date") as string),
    colors,
    pros: [] as string[],
    cons: [] as string[],
    faqs: [] as any /* eslint-disable-line @typescript-eslint/no-explicit-any */[],
    model_number: formData.get("model_number") as string,
    phone_variants: formData.get("phone_variants") as string,
    made_in: formData.get("made_in") as string,
    images,
    
    // Quick Highlights
    chipset_highlight: formData.get("chipset_highlight") as string,
    camera_highlight: formData.get("camera_highlight") as string,
    display_highlight: formData.get("display_highlight") as string,
    battery_highlight: formData.get("battery_highlight") as string,
    benchmark_highlight: formData.get("benchmark_highlight") as string,

    // Old fallbacks
    processor,
    ram,
    storage,
    display,
    camera_main,
    camera_front,
    battery,
    charging,
    network,
    antutu_score: parseSafeNumber(formData.get("antutu_score")),
    price_usd: parseSafeNumber(formData.get("price_usd")),
    price_official: parseSafeNumber(formData.get("price_usd")),
    price_unofficial: parseSafeNumber(formData.get("price_unofficial")),

    // General Info
    weight: formData.get("weight") as string,
    dimensions: formData.get("dimensions") as string,
    build_material: formData.get("build_material") as string,
    sim_type: formData.get("sim_type") as string,
    water_resistance: formData.get("water_resistance") as string,

    // Display
    display_type,
    screen_size,
    resolution: formData.get("resolution") as string,
    refresh_rate: formData.get("refresh_rate") as string,
    brightness: formData.get("brightness") as string,
    hdr: formData.get("hdr") as string,
    protection: formData.get("protection") as string,
    pixel_density: formData.get("pixel_density") as string,

    // Performance
    cpu,
    gpu: formData.get("gpu") as string,
    fabrication: formData.get("fabrication") as string,
    ram_variants,
    storage_variants,
    storage_type: formData.get("storage_type") as string,
    geekbench_score: formData.get("geekbench_score") as string,
    cooling_system: formData.get("cooling_system") as string,

    // Primary Camera
    cam_count: formData.get("cam_count") as string,
    cam_main_sensor,
    cam_ultrawide: formData.get("cam_ultrawide") as string,
    cam_telephoto: formData.get("cam_telephoto") as string,
    cam_macro: formData.get("cam_macro") as string,
    cam_ois: formData.get("cam_ois") as string,
    cam_flash: formData.get("cam_flash") as string,
    cam_video: formData.get("cam_video") as string,

    // Front Camera
    cam_front_resolution,
    cam_front_hdr: formData.get("cam_front_hdr") as string,
    cam_front_portrait: formData.get("cam_front_portrait") as string,
    cam_front_video: formData.get("cam_front_video") as string,

    // Battery & Charging
    battery_capacity,
    charging_wired,
    charging_wireless: formData.get("charging_wireless") as string,
    charging_reverse: formData.get("charging_reverse") as string,
    charger_included: formData.get("charger_included") === "on",
    usb_type: formData.get("usb_type") as string,

    // Network & Connectivity
    has_5g,
    wifi_version: formData.get("wifi_version") as string,
    bluetooth_version: formData.get("bluetooth_version") as string,
    has_nfc: formData.get("has_nfc") === "on",
    gps_specs: formData.get("gps_specs") as string,
    has_ir_blaster: formData.get("has_ir_blaster") === "on",
    has_audio_jack,
    usb_version: formData.get("usb_version") as string,

    // Sensors
    sensor_fingerprint: formData.get("sensor_fingerprint") as string,
    has_gyroscope: formData.get("has_gyroscope") === "on",
    has_compass: formData.get("has_compass") === "on",
    has_accelerometer: formData.get("has_accelerometer") === "on",
    has_face_unlock: formData.get("has_face_unlock") === "on",

    // Software & AI
    android_version: formData.get("android_version") as string,
    ui_version: formData.get("ui_version") as string,
    update_policy: formData.get("update_policy") as string,
    ai_features,
    has_circle_to_search: formData.get("has_circle_to_search") === "on",
    has_ai_editing: formData.get("has_ai_editing") === "on",
    has_live_translation: formData.get("has_live_translation") === "on",
    has_ai_assistant: formData.get("has_ai_assistant") === "on",

    // Removed manual related IDs reading, left empty to let frontend auto-suggest
    related_similar_ids: [],
    related_compare_ids: [],
    related_better_ids: [],
    
    updated_at: new Date(),
  };

  // Auto-generate Pros, Cons, FAQs based on specs
  const autoPros: string[] = [];
  const autoCons: string[] = [];
  const autoFaqs: any /* eslint-disable-line @typescript-eslint/no-explicit-any */[] = [];

  const nfc = formData.get("has_nfc") === "on";
  const storage_type = formData.get("storage_type") as string;

  if (has_5g) autoPros.push("Supports Latest 5G Network");
  if (nfc) autoPros.push("NFC support for contactless payments");
  
  const parsedBattery = battery_capacity ? parseSafeNumber(battery_capacity) : null;
  if (parsedBattery && parsedBattery >= 5000) autoPros.push(`Large ${battery_capacity} Battery for all-day use`);
  
  if (display_type && (display_type.toLowerCase().includes('amoled') || display_type.toLowerCase().includes('oled'))) autoPros.push("Vibrant and crisp AMOLED/OLED display");
  if (display_type && display_type.toLowerCase().includes('ltpo')) autoPros.push("LTPO technology for better battery efficiency");
  
  const refreshRateRaw = formData.get("refresh_rate") as string;
  const parsedRefresh = refreshRateRaw ? parseSafeNumber(refreshRateRaw) : null;
  if (parsedRefresh && parsedRefresh >= 120) autoPros.push("Smooth 120Hz+ High Refresh Rate Screen");
  
  const parsedCam = cam_main_sensor ? parseSafeNumber(cam_main_sensor) : null;
  if (parsedCam && parsedCam >= 50) autoPros.push(`High resolution ${parsedCam}MP Main Camera`);
  if (cam_main_sensor && cam_main_sensor.toLowerCase().includes('ois')) autoPros.push("Optical Image Stabilization (OIS) for steady shots");
  
  const water_res = formData.get("water_resistance") as string;
  if (water_res && water_res.includes("IP68")) autoPros.push("IP68 Water and Dust Resistant");
  
  if (storage_type && (storage_type.includes("UFS 4.0") || storage_type.includes("NVMe"))) autoPros.push("Ultra-fast UFS 4.0 / NVMe storage");
  
  const charger_included = formData.get("charger_included") === "on";
  if (!charger_included) autoCons.push("Charging adapter is not included in the box");
  if (!has_audio_jack) autoCons.push("Lacks a 3.5mm headphone jack");
  
  const weightRaw = formData.get("weight") as string;
  const parsedWeight = weightRaw ? parseSafeNumber(weightRaw) : null;
  if (parsedWeight && parsedWeight >= 210) autoCons.push("Device is relatively heavy");
  if (parsedWeight && parsedWeight < 170) autoPros.push("Lightweight and comfortable to hold");

  if (charging_wired) autoFaqs.push({ question: "Does it support fast charging?", answer: `Yes, it supports ${charging_wired}.` });
  if (has_5g) autoFaqs.push({ question: "Does this smartphone support 5G?", answer: "Yes, it is fully compatible with 5G networks for high-speed internet." });
  autoFaqs.push({ question: "Is the charger included in the box?", answer: charger_included ? "Yes, a compatible charging adapter is included in the retail box." : "No, the retail box only contains the phone and a cable. The charging brick must be purchased separately." });
  if (water_res) autoFaqs.push({ question: "Is this phone water-resistant?", answer: water_res });
  
  const made_in = formData.get("made_in") as string;
  if (made_in) autoFaqs.push({ question: "Where is this phone manufactured?", answer: `This device is manufactured in ${made_in}.` });

  phoneData.pros = autoPros;
  phoneData.cons = autoCons;
  phoneData.faqs = autoFaqs;

  try {
    await Phone.findByIdAndUpdate(id, phoneData);
    
    // Log activity
    await ActivityLog.create({
      title: `Updated phone: ${name}`,
      type: 'Phone',
      action: 'Update',
      icon: 'Smartphone',
      color: 'text-purple-500 bg-purple-50',
    });
  } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
    console.error("Error updating phone:", error);
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/phones");
  revalidatePath("/compare");
  revalidatePath("/phones/[brand]", "page");
  revalidatePath("/phones/[brand]/[model]", "page");
  revalidateTag("phones", "max");
  revalidateTag("featured-phones", "max");
  revalidateTag("upcoming-phones", "max");

  const returnUrl = formData.get("returnUrl") as string;
  if (returnUrl) {
    redirect(returnUrl);
  } else {
    redirect("/admin/phones");
  }
}
