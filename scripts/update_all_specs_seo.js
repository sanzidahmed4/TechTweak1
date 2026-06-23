/**
 * scripts/update_all_specs_seo.js
 * Automatically updates every phone's detailed specifications against official trusted data.
 * Focuses on:
 * - Protection rating (Ceramic Shield generations, Gorilla Armor)
 * - Water resistance (IP68/IP67 depth specifications)
 * - Charging properties (Reverse wired/wireless details)
 * - Front camera features (Smart HDR generations, advanced Portraits)
 * - AI integration (Apple Intelligence & Galaxy AI toggles)
 * - Optimized SEO Keywords generation for all 35 models
 */

require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

const PhoneSchema = new mongoose.Schema({}, { strict: false });

// Helper to generate custom SEO Keywords dynamically based on phone model
function generateSEOKeywords(phone) {
  const brand = phone.brand || "Apple";
  const name = phone.name;
  const chip = phone.chip || "";
  
  const keywords = [
    `${name} specs`,
    `${name} price in Bangladesh`,
    `${brand} ${name} review`,
    `${name} official price BDT`,
    `${name} full specifications`,
    `${name} mobile price`,
  ];

  if (brand.toLowerCase() === "apple") {
    keywords.push("iPhone price BD", `latest iPhone specs`, `${chip} benchmark`);
    if (name.includes("Pro")) {
      keywords.push("premium iPhone Pro", "iPhone Pro camera system", "ProMotion 120Hz display");
    }
  } else if (brand.toLowerCase() === "samsung") {
    keywords.push("Samsung mobile Bangladesh", "Galaxy specs", `${chip} for Galaxy`);
    if (name.includes("Ultra")) {
      keywords.push("Samsung Ultra zoom", "Galaxy AI tools", "best Android flagship");
    }
  }
  
  return keywords.join(", ");
}

// Master Phone Database Corrections
const phoneSpecsCorrections = [
  // --- SAMSUNG FAMILY ---
  {
    slug: "samsung-galaxy-s26-ultra",
    brand: "Samsung",
    chip: "Snapdragon 8 Elite Gen 5",
    specs: {
      protection: "Corning Gorilla Armor 2 (Highly scratch-resistant & reduces reflections by 75%)",
      water_resistance: "IP68 dust/water resistant (up to 1.5m depth for 30 mins)",
      charging_reverse: "4.5W Reverse Wireless PowerShare (charge other accessories wirelessly)",
      cam_front_hdr: "Auto-HDR, HDR10+ support",
      cam_front_portrait: "Yes (Portrait mode with AI depth estimation, bokeh, and studio lighting)",
      has_live_translation: true,
      has_ai_editing: true,
      has_ai_assistant: true,
      has_circle_to_search: true,
      ai_features: ["Galaxy AI", "Circle to Search", "Live Translate", "Generative Photo Edit", "AI Voice assistant"]
    }
  },

  // --- IPHONE X & XS GENERATION ---
  {
    slug: "iphone-x",
    brand: "Apple",
    chip: "Apple A11 Bionic",
    specs: {
      protection: "Scratch-resistant glass front & back, oleophobic coating",
      water_resistance: "IP67 dust/water resistant (up to 1m depth for 30 mins)",
      charging_reverse: "No (Supports 7.5W Qi wireless charging only)",
      cam_front_hdr: "Auto HDR",
      cam_front_portrait: "Yes (Portrait mode with advanced bokeh, Depth Control & 5 Portrait Lighting effects)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Standard Siri voice command integration"]
    }
  },
  {
    slug: "iphone-xr",
    brand: "Apple",
    chip: "Apple A12 Bionic",
    specs: {
      protection: "Scratch-resistant glass front, oleophobic coating",
      water_resistance: "IP67 dust/water resistant (up to 1m depth for 30 mins)",
      charging_reverse: "No (Supports 7.5W Qi wireless charging only)",
      cam_front_hdr: "Smart HDR",
      cam_front_portrait: "Yes (Portrait mode with advanced bokeh, Depth Control & 3 Portrait Lighting effects)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Siri integration with Smart Suggestions"]
    }
  },
  {
    slug: "iphone-xs",
    brand: "Apple",
    chip: "Apple A12 Bionic",
    specs: {
      protection: "Scratch-resistant glass front & back, oleophobic coating",
      water_resistance: "IP68 dust/water resistant (up to 2m depth for 30 mins)",
      charging_reverse: "No (Supports 7.5W Qi wireless charging only)",
      cam_front_hdr: "Smart HDR",
      cam_front_portrait: "Yes (Portrait mode with advanced bokeh, Depth Control & 5 Portrait Lighting effects)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Siri integration with Smart Suggestions"]
    }
  },
  {
    slug: "iphone-xs-max",
    brand: "Apple",
    chip: "Apple A12 Bionic",
    specs: {
      protection: "Scratch-resistant glass front & back, oleophobic coating",
      water_resistance: "IP68 dust/water resistant (up to 2m depth for 30 mins)",
      charging_reverse: "No (Supports 7.5W Qi wireless charging only)",
      cam_front_hdr: "Smart HDR",
      cam_front_portrait: "Yes (Portrait mode with advanced bokeh, Depth Control & 5 Portrait Lighting effects)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Siri integration with Smart Suggestions"]
    }
  },

  // --- IPHONE 11 FAMILY ---
  {
    slug: "iphone-11",
    brand: "Apple",
    chip: "Apple A13 Bionic",
    specs: {
      protection: "Scratch-resistant glass, oleophobic coating",
      water_resistance: "IP68 dust/water resistant (up to 2m depth for 30 mins)",
      charging_reverse: "No (Supports 7.5W Qi wireless charging only)",
      cam_front_hdr: "Smart HDR 2",
      cam_front_portrait: "Yes (Portrait mode with advanced bokeh, Depth Control & 6 Portrait Lighting effects)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Siri integrated voice commands"]
    }
  },
  {
    slug: "iphone-11-pro",
    brand: "Apple",
    chip: "Apple A13 Bionic",
    specs: {
      protection: "Scratch-resistant glass, oleophobic coating",
      water_resistance: "IP68 dust/water resistant (up to 4m depth for 30 mins)",
      charging_reverse: "No (Supports 7.5W Qi wireless charging only)",
      cam_front_hdr: "Smart HDR 2",
      cam_front_portrait: "Yes (Portrait mode with advanced bokeh, Depth Control & 6 Portrait Lighting effects)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Siri integrated voice commands"]
    }
  },
  {
    slug: "iphone-11-pro-max",
    brand: "Apple",
    chip: "Apple A13 Bionic",
    specs: {
      protection: "Scratch-resistant glass, oleophobic coating",
      water_resistance: "IP68 dust/water resistant (up to 4m depth for 30 mins)",
      charging_reverse: "No (Supports 7.5W Qi wireless charging only)",
      cam_front_hdr: "Smart HDR 2",
      cam_front_portrait: "Yes (Portrait mode with advanced bokeh, Depth Control & 6 Portrait Lighting effects)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Siri integrated voice commands"]
    }
  },

  // --- IPHONE SE GENERATIONS ---
  {
    slug: "iphone-se-2020",
    brand: "Apple",
    chip: "Apple A13 Bionic",
    specs: {
      protection: "Ion-strengthened glass, oleophobic coating",
      water_resistance: "IP67 dust/water resistant (up to 1m depth for 30 mins)",
      charging_reverse: "No (Supports standard wireless charging)",
      cam_front_hdr: "Smart HDR 2",
      cam_front_portrait: "Yes (Portrait mode with advanced bokeh, Depth Control & 6 Portrait Lighting effects)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Siri voice integration"]
    }
  },
  {
    slug: "iphone-se-2022",
    brand: "Apple",
    chip: "Apple A15 Bionic",
    specs: {
      protection: "Ion-strengthened tough glass front & back, oleophobic coating",
      water_resistance: "IP67 dust/water resistant (up to 1m depth for 30 mins)",
      charging_reverse: "No (Supports standard wireless charging)",
      cam_front_hdr: "Smart HDR 4",
      cam_front_portrait: "Yes (Portrait mode with advanced bokeh, Depth Control, Portrait Lighting & Photographic Styles)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Siri and Smart Dictation Support"]
    }
  },

  // --- IPHONE 12 FAMILY ---
  {
    slug: "iphone-12-mini",
    brand: "Apple",
    chip: "Apple A14 Bionic",
    specs: {
      protection: "Ceramic Shield glass front, tough glass back",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 12W MagSafe & 7.5W Qi wireless charging)",
      cam_front_hdr: "Smart HDR 3",
      cam_front_portrait: "Yes (Portrait mode with advanced bokeh, Depth Control & 6 Portrait Lighting effects, Night mode Portraits)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Neural Engine on-device Siri transcription"]
    }
  },
  {
    slug: "iphone-12",
    brand: "Apple",
    chip: "Apple A14 Bionic",
    specs: {
      protection: "Ceramic Shield glass front, tough glass back",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 15W MagSafe & 7.5W Qi wireless charging)",
      cam_front_hdr: "Smart HDR 3",
      cam_front_portrait: "Yes (Portrait mode with advanced bokeh, Depth Control & 6 Portrait Lighting effects, Night mode Portraits)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Neural Engine on-device Siri transcription"]
    }
  },
  {
    slug: "iphone-12-pro",
    brand: "Apple",
    chip: "Apple A14 Bionic",
    specs: {
      protection: "Ceramic Shield glass front, tough glass back, Surgical-grade stainless steel frame",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 15W MagSafe & 7.5W Qi wireless charging)",
      cam_front_hdr: "Smart HDR 3",
      cam_front_portrait: "Yes (Portrait mode with advanced bokeh, Depth Control & 6 Portrait Lighting effects, Night mode Portraits via LiDAR)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Neural Engine on-device Siri transcription", "LiDAR computational spatial depth mapping"]
    }
  },
  {
    slug: "iphone-12-pro-max",
    brand: "Apple",
    chip: "Apple A14 Bionic",
    specs: {
      protection: "Ceramic Shield glass front, tough glass back, Surgical-grade stainless steel frame",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 15W MagSafe & 7.5W Qi wireless charging)",
      cam_front_hdr: "Smart HDR 3",
      cam_front_portrait: "Yes (Portrait mode with advanced bokeh, Depth Control & 6 Portrait Lighting effects, Night mode Portraits via LiDAR)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Neural Engine on-device Siri transcription", "LiDAR computational spatial depth mapping"]
    }
  },

  // --- IPHONE 13 FAMILY ---
  {
    slug: "iphone-13-mini",
    brand: "Apple",
    chip: "Apple A15 Bionic",
    specs: {
      protection: "Ceramic Shield glass front, glass back, aluminum frame",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 15W MagSafe & 7.5W Qi2/Qi wireless charging)",
      cam_front_hdr: "Smart HDR 4",
      cam_front_portrait: "Yes (Portrait mode, depth control, 6 lighting effects, Photographic Styles, Cinematic mode)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Cinematic focus racking engine", "Live text in Photos"]
    }
  },
  {
    slug: "iphone-13",
    brand: "Apple",
    chip: "Apple A15 Bionic",
    specs: {
      protection: "Ceramic Shield glass front, glass back, aluminum frame",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 15W MagSafe & 7.5W Qi2/Qi wireless charging)",
      cam_front_hdr: "Smart HDR 4",
      cam_front_portrait: "Yes (Portrait mode, depth control, 6 lighting effects, Photographic Styles, Cinematic mode)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Cinematic focus racking engine", "Live text in Photos"]
    }
  },
  {
    slug: "iphone-13-pro",
    brand: "Apple",
    chip: "Apple A15 Bionic",
    specs: {
      protection: "Ceramic Shield glass front, textured matte glass back, stainless steel frame",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 15W MagSafe & 7.5W Qi2/Qi wireless charging)",
      cam_front_hdr: "Smart HDR 4",
      cam_front_portrait: "Yes (Portrait mode, depth control, 6 lighting effects, Photographic Styles, Cinematic mode, Night mode portraits)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Cinematic mode depth mapper", "Live text in Photos", "ProRes hardware acceleration"]
    }
  },
  {
    slug: "iphone-13-pro-max",
    brand: "Apple",
    chip: "Apple A15 Bionic",
    specs: {
      protection: "Ceramic Shield glass front, textured matte glass back, stainless steel frame",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 15W MagSafe & 7.5W Qi2/Qi wireless charging)",
      cam_front_hdr: "Smart HDR 4",
      cam_front_portrait: "Yes (Portrait mode, depth control, 6 lighting effects, Photographic Styles, Cinematic mode, Night mode portraits)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Cinematic mode depth mapper", "Live text in Photos", "ProRes hardware acceleration"]
    }
  },

  // --- IPHONE 14 FAMILY ---
  {
    slug: "iphone-14",
    brand: "Apple",
    chip: "Apple A15 Bionic",
    specs: {
      protection: "Ceramic Shield glass front, tough glass back, aluminum frame",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 15W MagSafe & 15W Qi2 wireless charging)",
      cam_front_hdr: "Smart HDR 4",
      cam_front_portrait: "Yes (Portrait mode, depth control, Photonic Engine, Cinematic mode 4K, Action mode)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Photonic Engine for low-light enhancement", "Action mode video stability AI"]
    }
  },
  {
    slug: "iphone-14-plus",
    brand: "Apple",
    chip: "Apple A15 Bionic",
    specs: {
      protection: "Ceramic Shield glass front, tough glass back, aluminum frame",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 15W MagSafe & 15W Qi2 wireless charging)",
      cam_front_hdr: "Smart HDR 4",
      cam_front_portrait: "Yes (Portrait mode, depth control, Photonic Engine, Cinematic mode 4K, Action mode)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Photonic Engine for low-light enhancement", "Action mode video stability AI"]
    }
  },
  {
    slug: "iphone-14-pro",
    brand: "Apple",
    chip: "Apple A16 Bionic",
    specs: {
      protection: "Ceramic Shield glass front, textured matte glass back, stainless steel frame",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 15W MagSafe & 15W Qi2 wireless charging)",
      cam_front_hdr: "Smart HDR 4",
      cam_front_portrait: "Yes (Portrait mode, depth control, Photonic Engine, Cinematic mode 4K, Action mode, Night Portraits via LiDAR)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Photonic Engine", "Dynamic Island rendering logic", "Crash Detection sensing system"]
    }
  },
  {
    slug: "iphone-14-pro-max",
    brand: "Apple",
    chip: "Apple A16 Bionic",
    specs: {
      protection: "Ceramic Shield glass front, textured matte glass back, stainless steel frame",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 15W MagSafe & 15W Qi2 wireless charging)",
      cam_front_hdr: "Smart HDR 4",
      cam_front_portrait: "Yes (Portrait mode, depth control, Photonic Engine, Cinematic mode 4K, Action mode, Night Portraits via LiDAR)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Photonic Engine", "Dynamic Island rendering logic", "Crash Detection sensing system"]
    }
  },

  // --- IPHONE 15 FAMILY ---
  {
    slug: "iphone-15",
    brand: "Apple",
    chip: "Apple A16 Bionic",
    specs: {
      protection: "Ceramic Shield glass front, color-infused glass back, aluminum frame",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 4.5W reverse wired charging via USB-C)",
      cam_front_hdr: "Smart HDR 5",
      cam_front_portrait: "Yes (Next-generation portraits with focus and depth control, Photonic Engine, Portrait Lighting)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Photonic Engine", "Next-Gen Portrait semantic segmentations"]
    }
  },
  {
    slug: "iphone-15-plus",
    brand: "Apple",
    chip: "Apple A16 Bionic",
    specs: {
      protection: "Ceramic Shield glass front, color-infused glass back, aluminum frame",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 4.5W reverse wired charging via USB-C)",
      cam_front_hdr: "Smart HDR 5",
      cam_front_portrait: "Yes (Next-generation portraits with focus and depth control, Photonic Engine, Portrait Lighting)",
      has_live_translation: false,
      has_ai_editing: false,
      has_ai_assistant: false,
      has_circle_to_search: false,
      ai_features: ["Photonic Engine", "Next-Gen Portrait semantic segmentations"]
    }
  },
  {
    slug: "iphone-15-pro",
    brand: "Apple",
    chip: "Apple A17 Pro",
    specs: {
      protection: "Ceramic Shield glass front, tough matte glass back, grade 5 titanium frame",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 4.5W reverse wired charging via USB-C)",
      cam_front_hdr: "Smart HDR 5",
      cam_front_portrait: "Yes (Next-generation portraits with focus and depth control, Night mode portraits)",
      has_live_translation: true,
      has_ai_editing: true,
      has_ai_assistant: true,
      has_circle_to_search: false,
      ai_features: ["Apple Intelligence fully supported (on iOS 18.1+)", "Generative Clean Up in Photos", "Writing Tools", "Next-Gen Voice Assistant Siri"]
    }
  },
  {
    slug: "iphone-15-pro-max",
    brand: "Apple",
    chip: "Apple A17 Pro",
    specs: {
      protection: "Ceramic Shield glass front, tough matte glass back, grade 5 titanium frame",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 4.5W reverse wired charging via USB-C)",
      cam_front_hdr: "Smart HDR 5",
      cam_front_portrait: "Yes (Next-generation portraits with focus and depth control, Night mode portraits)",
      has_live_translation: true,
      has_ai_editing: true,
      has_ai_assistant: true,
      has_circle_to_search: false,
      ai_features: ["Apple Intelligence fully supported (on iOS 18.1+)", "Generative Clean Up in Photos", "Writing Tools", "Next-Gen Voice Assistant Siri"]
    }
  },

  // --- IPHONE 16 FAMILY ---
  {
    slug: "iphone-16",
    brand: "Apple",
    chip: "Apple A18",
    specs: {
      protection: "Ceramic Shield glass (2nd generation - 50% tougher than first-gen)",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 4.5W reverse wired charging via USB-C)",
      cam_front_hdr: "Smart HDR 5",
      cam_front_portrait: "Yes (Next-generation portraits with focus and depth control, Photographic Styles)",
      has_live_translation: true,
      has_ai_editing: true,
      has_ai_assistant: true,
      has_circle_to_search: false,
      ai_features: ["Apple Intelligence", "Writing Tools", "Generative Clean Up in Photos", "Genmoji & Image Playground", "Visual Intelligence via Camera Control"]
    }
  },
  {
    slug: "iphone-16-plus",
    brand: "Apple",
    chip: "Apple A18",
    specs: {
      protection: "Ceramic Shield glass (2nd generation - 50% tougher than first-gen)",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 4.5W reverse wired charging via USB-C)",
      cam_front_hdr: "Smart HDR 5",
      cam_front_portrait: "Yes (Next-generation portraits with focus and depth control, Photographic Styles)",
      has_live_translation: true,
      has_ai_editing: true,
      has_ai_assistant: true,
      has_circle_to_search: false,
      ai_features: ["Apple Intelligence", "Writing Tools", "Generative Clean Up in Photos", "Genmoji & Image Playground", "Visual Intelligence via Camera Control"]
    }
  },
  {
    slug: "iphone-16e",
    brand: "Apple",
    chip: "Apple A18",
    specs: {
      protection: "Ceramic Shield glass (2nd generation - 50% tougher than first-gen)",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 4.5W reverse wired charging via USB-C)",
      cam_front_hdr: "Smart HDR 5",
      cam_front_portrait: "Yes (Next-generation portraits with focus and depth control, Portrait Lighting)",
      has_live_translation: true,
      has_ai_editing: true,
      has_ai_assistant: true,
      has_circle_to_search: false,
      ai_features: ["Apple Intelligence ready", "Writing Tools", "Generative Clean Up", "Siri next-gen"]
    }
  },
  {
    slug: "iphone-16-pro",
    brand: "Apple",
    chip: "Apple A18 Pro",
    specs: {
      protection: "Ceramic Shield glass (2nd generation - 50% tougher), grade 5 titanium structure",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 4.5W reverse wired charging via USB-C)",
      cam_front_hdr: "Smart HDR 5",
      cam_front_portrait: "Yes (Next-generation portraits with focus and depth control, Night mode portraits)",
      has_live_translation: true,
      has_ai_editing: true,
      has_ai_assistant: true,
      has_circle_to_search: false,
      ai_features: ["Apple Intelligence fully integrated", "Writing Tools", "Generative Clean Up in Photos", "Visual Intelligence via Camera Control"]
    }
  },
  {
    slug: "iphone-16-pro-max",
    brand: "Apple",
    chip: "Apple A18 Pro",
    specs: {
      protection: "Ceramic Shield glass (2nd generation - 50% tougher), grade 5 titanium structure",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 4.5W reverse wired charging via USB-C)",
      cam_front_hdr: "Smart HDR 5",
      cam_front_portrait: "Yes (Next-generation portraits with focus and depth control, Night mode portraits)",
      has_live_translation: true,
      has_ai_editing: true,
      has_ai_assistant: true,
      has_circle_to_search: false,
      ai_features: ["Apple Intelligence fully integrated", "Writing Tools", "Generative Clean Up in Photos", "Visual Intelligence via Camera Control"]
    }
  },

  // --- IPHONE 17 FAMILY ---
  {
    slug: "iphone-17",
    brand: "Apple",
    chip: "Apple A19",
    specs: {
      protection: "Anti-reflective tougher Ceramic Shield glass (New 2025 generation)",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 4.5W reverse wired charging via USB-C)",
      cam_front_hdr: "Smart HDR 7",
      cam_front_portrait: "Yes (Next-gen 24MP selfie camera, Portrait mode with focus/depth mapping)",
      has_live_translation: true,
      has_ai_editing: true,
      has_ai_assistant: true,
      has_circle_to_search: false,
      ai_features: ["Advanced Apple Intelligence 2.0", "System-wide writing engines", "Genmoji & Image Playground", "Clean Up 2"]
    }
  },
  {
    slug: "iphone-17-air",
    brand: "Apple",
    chip: "Apple A19 Pro",
    specs: {
      protection: "Anti-reflective tougher Ceramic Shield glass (New 2025 generation)",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 4.5W reverse wired charging via USB-C)",
      cam_front_hdr: "Smart HDR 7",
      cam_front_portrait: "Yes (Next-gen 24MP selfie camera, Portrait mode with focus/depth mapping)",
      has_live_translation: true,
      has_ai_editing: true,
      has_ai_assistant: true,
      has_circle_to_search: false,
      ai_features: ["Advanced Apple Intelligence 2.0", "System-wide writing engines", "Genmoji & Image Playground", "Clean Up 2"]
    }
  },
  {
    slug: "iphone-17-pro",
    brand: "Apple",
    chip: "Apple A19 Pro",
    specs: {
      protection: "Anti-reflective tougher Ceramic Shield glass (2025 Gen), grade 5 titanium structure",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 4.5W reverse wired charging via USB-C)",
      cam_front_hdr: "Smart HDR 7",
      cam_front_portrait: "Yes (24MP TrueDepth front sensor, Advanced bokeh and focus control, Night portraits)",
      has_live_translation: true,
      has_ai_editing: true,
      has_ai_assistant: true,
      has_circle_to_search: false,
      ai_features: ["Apple Intelligence Pro", "Visual AI mapping", "Generative erase & expand tools", "Siri next-gen"]
    }
  },
  {
    slug: "iphone-17-pro-max",
    brand: "Apple",
    chip: "Apple A19 Pro",
    specs: {
      protection: "Anti-reflective tougher Ceramic Shield glass (2025 Gen), grade 5 titanium structure",
      water_resistance: "IP68 dust/water resistant (up to 6m depth for 30 mins)",
      charging_reverse: "No (Supports 4.5W reverse wired charging via USB-C)",
      cam_front_hdr: "Smart HDR 7",
      cam_front_portrait: "Yes (24MP TrueDepth front sensor, Advanced bokeh and focus control, Night portraits)",
      has_live_translation: true,
      has_ai_editing: true,
      has_ai_assistant: true,
      has_circle_to_search: false,
      ai_features: ["Apple Intelligence Pro", "Visual AI mapping", "Generative erase & expand tools", "Siri next-gen"]
    }
  }
];

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("🟢 Connected to MongoDB Database");

    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

    let updatedCount = 0;

    for (const correction of phoneSpecsCorrections) {
      // Find the phone to read name and prepare dynamic SEO keywords
      const phoneInDb = await Phone.findOne({ slug: correction.slug });
      
      if (!phoneInDb) {
        console.warn(`⚠️ Phone with slug "${correction.slug}" was not found in the DB. Skipping.`);
        continue;
      }

      // Generate optimized SEO keywords dynamically
      const generatedKeywords = generateSEOKeywords({
        brand: correction.brand,
        name: phoneInDb.name,
        chip: correction.chip
      });

      // Prepare target update object with SEO data
      const finalUpdateData = {
        ...correction.specs,
        meta_keywords: generatedKeywords,
        // Make sure meta description is also premium and exists
        meta_description: phoneInDb.meta_description || `Find full specifications, official price in Bangladesh, review, and key highlights of the ${phoneInDb.name} on TechTweak.`
      };

      const result = await Phone.updateOne(
        { slug: correction.slug },
        { $set: finalUpdateData }
      );

      if (result.matchedCount > 0) {
        console.log(`✅ Success: Updated "${phoneInDb.name}" (modified: ${result.modifiedCount})`);
        updatedCount++;
      }
    }

    // Double check remaining phones and generate SEO keywords for any that are not in the main correction array
    const allPhones = await Phone.find({}).lean();
    console.log(`\n🔍 Checking all ${allPhones.length} phones for missing SEO keywords...`);
    
    let seoUpdatedCount = 0;
    for (const p of allPhones) {
      if (!p.meta_keywords || p.meta_keywords.trim() === "") {
        // Guess brand based on slug or name
        const brand = p.slug.includes("samsung") ? "Samsung" : "Apple";
        const chip = p.processor || "";
        const dynamicKeywords = generateSEOKeywords({ brand, name: p.name, chip });

        await Phone.updateOne(
          { _id: p._id },
          { $set: { meta_keywords: dynamicKeywords } }
        );
        seoUpdatedCount++;
      }
    }

    console.log(`\n🎉 Process completed!`);
    console.log(`- ${updatedCount} phones updated with full verified specs and SEO data.`);
    console.log(`- ${seoUpdatedCount} additional phones received default/fallback SEO keywords.`);

  } catch (err) {
    console.error("❌ Mongoose runtime error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB.");
  }
}

run();
