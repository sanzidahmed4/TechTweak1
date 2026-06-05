import mongoose, { Schema, Document } from 'mongoose';
import './Brand'; // Ensure Brand model is registered for populations

export interface IPhone extends Document {
  name: string;
  slug: string;
  brand_id: mongoose.Types.ObjectId;
  category_id?: mongoose.Types.ObjectId;
  
  // Basic Info (Expanded)
  price_usd?: number;
  price_bdt?: number;
  price_official?: number;
  price_unofficial?: number;
  is_official?: boolean;
  release_date?: string;
  release_date_parsed?: Date | null;
  is_published: boolean;
  is_featured: boolean;
  upcoming?: boolean;
  colors?: string[];
  model_number?: string;
  made_in?: string;
  phone_variants?: string;

  // Media
  images: string[];
  
  // Quick Highlights
  chipset_highlight?: string;
  camera_highlight?: string;
  display_highlight?: string;
  battery_highlight?: string;
  benchmark_highlight?: string;

  // Old fallbacks
  display?: string;
  processor?: string;
  ram?: string;
  storage?: string;
  camera_main?: string;
  camera_front?: string;
  camera_video?: string;
  battery?: string;
  charging?: string;
  network?: string;
  antutu_score?: number;

  // General Information
  weight?: string;
  dimensions?: string;
  build_material?: string;
  sim_type?: string;
  water_resistance?: string;

  // Display Section
  display_type?: string;
  screen_size?: string;
  resolution?: string;
  refresh_rate?: string;
  brightness?: string;
  hdr?: string;
  protection?: string;
  pixel_density?: string;

  // Performance Section
  cpu?: string;
  gpu?: string;
  fabrication?: string;
  ram_variants?: string;
  storage_variants?: string;
  storage_type?: string;
  geekbench_score?: string;
  cooling_system?: string;

  // Primary Camera
  cam_count?: string;
  cam_main_sensor?: string;
  cam_ultrawide?: string;
  cam_telephoto?: string;
  cam_macro?: string;
  cam_ois?: string;
  cam_flash?: string;
  cam_video?: string;

  // Front Camera
  cam_front_resolution?: string;
  cam_front_hdr?: string;
  cam_front_portrait?: string;
  cam_front_video?: string;

  // Battery & Charging
  battery_capacity?: string;
  charging_wired?: string;
  charging_wireless?: string;
  charging_reverse?: string;
  charger_included?: boolean;
  usb_type?: string;

  // Network & Connectivity
  has_5g?: boolean;
  wifi_version?: string;
  bluetooth_version?: string;
  has_nfc?: boolean;
  gps_specs?: string;
  has_ir_blaster?: boolean;
  has_audio_jack?: boolean;
  usb_version?: string;

  // Sensors
  sensor_fingerprint?: string;
  has_gyroscope?: boolean;
  has_compass?: boolean;
  has_accelerometer?: boolean;
  has_face_unlock?: boolean;

  // Software & AI Features
  android_version?: string;
  ui_version?: string;
  update_policy?: string;
  ai_features?: string[];
  has_circle_to_search?: boolean;
  has_ai_editing?: boolean;
  has_live_translation?: boolean;
  has_ai_assistant?: boolean;

  // Pros & Cons
  pros?: string[];
  cons?: string[];

  // FAQ System
  faqs?: { question: string; answer: string }[];

  // SEO Section
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  og_image?: string;

  // Related Devices
  related_similar_ids?: mongoose.Types.ObjectId[];
  related_compare_ids?: mongoose.Types.ObjectId[];
  related_better_ids?: mongoose.Types.ObjectId[];

  created_at: Date;
  updated_at: Date;
}

const PhoneSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  brand_id: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'Category' },
  
  // Basic Info
  price_usd: { type: Number },
  price_bdt: { type: Number },
  price_official: { type: Number },
  price_unofficial: { type: Number },
  is_official: { type: Boolean, default: true },
  release_date: { type: String },
  release_date_parsed: { type: Date, default: null },
  is_published: { type: Boolean, default: false },
  is_featured: { type: Boolean, default: false },
  upcoming: { type: Boolean, default: false },
  colors: { type: [String], default: [] },
  model_number: { type: String },
  made_in: { type: String },
  phone_variants: { type: String },

  // Media
  images: { type: [String], default: [] },
  
  // Quick Highlights
  chipset_highlight: { type: String },
  camera_highlight: { type: String },
  display_highlight: { type: String },
  battery_highlight: { type: String },
  benchmark_highlight: { type: String },

  // Old fallbacks
  display: { type: String },
  processor: { type: String },
  ram: { type: String },
  storage: { type: String },
  camera_main: { type: String },
  camera_front: { type: String },
  camera_video: { type: String },
  battery: { type: String },
  charging: { type: String },
  network: { type: String },
  antutu_score: { type: Number },

  // General Information
  weight: { type: String },
  dimensions: { type: String },
  build_material: { type: String },
  sim_type: { type: String },
  water_resistance: { type: String },

  // Display Section
  display_type: { type: String },
  screen_size: { type: String },
  resolution: { type: String },
  refresh_rate: { type: String },
  brightness: { type: String },
  hdr: { type: String },
  protection: { type: String },
  pixel_density: { type: String },

  // Performance Section
  cpu: { type: String },
  gpu: { type: String },
  fabrication: { type: String },
  ram_variants: { type: String },
  storage_variants: { type: String },
  storage_type: { type: String },
  geekbench_score: { type: String },
  cooling_system: { type: String },

  // Primary Camera
  cam_count: { type: String },
  cam_main_sensor: { type: String },
  cam_ultrawide: { type: String },
  cam_telephoto: { type: String },
  cam_macro: { type: String },
  cam_ois: { type: String },
  cam_flash: { type: String },
  cam_video: { type: String },

  // Front Camera
  cam_front_resolution: { type: String },
  cam_front_hdr: { type: String },
  cam_front_portrait: { type: String },
  cam_front_video: { type: String },

  // Battery & Charging
  battery_capacity: { type: String },
  charging_wired: { type: String },
  charging_wireless: { type: String },
  charging_reverse: { type: String },
  charger_included: { type: Boolean, default: true },
  usb_type: { type: String },

  // Network & Connectivity
  has_5g: { type: Boolean, default: false },
  wifi_version: { type: String },
  bluetooth_version: { type: String },
  has_nfc: { type: Boolean, default: false },
  gps_specs: { type: String },
  has_ir_blaster: { type: Boolean, default: false },
  has_audio_jack: { type: Boolean, default: false },
  usb_version: { type: String },

  // Sensors
  sensor_fingerprint: { type: String },
  has_gyroscope: { type: Boolean, default: false },
  has_compass: { type: Boolean, default: false },
  has_accelerometer: { type: Boolean, default: false },
  has_face_unlock: { type: Boolean, default: false },

  // Software & AI Features
  android_version: { type: String },
  ui_version: { type: String },
  update_policy: { type: String },
  ai_features: { type: [String], default: [] },
  has_circle_to_search: { type: Boolean, default: false },
  has_ai_editing: { type: Boolean, default: false },
  has_live_translation: { type: Boolean, default: false },
  has_ai_assistant: { type: Boolean, default: false },

  // Pros & Cons
  pros: { type: [String], default: [] },
  cons: { type: [String], default: [] },

  // FAQ System
  faqs: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }],

  // SEO Section
  meta_title: { type: String },
  meta_description: { type: String },
  meta_keywords: { type: String },
  og_image: { type: String },

  // Related Devices
  related_similar_ids: [{ type: Schema.Types.ObjectId, ref: 'Phone' }],
  related_compare_ids: [{ type: Schema.Types.ObjectId, ref: 'Phone' }],
  related_better_ids: [{ type: Schema.Types.ObjectId, ref: 'Phone' }],

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.Phone || mongoose.model<IPhone>('Phone', PhoneSchema);
