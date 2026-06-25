import mongoose, { Schema, Document } from 'mongoose';
import './Brand'; // Ensure Brand model is registered for populations

export interface IPhone extends Document {
  name: string;
  slug: string;
  brand_id: mongoose.Types.ObjectId;
  category_id?: mongoose.Types.ObjectId;
  
  // Basic Info (Expanded)
  price_usd?: number;
  price_inr?: number;
  price_eur?: number;
  price_gbp?: number;
  price_official?: number;
  price_unofficial?: number;
  is_official?: boolean;
  release_date?: string;
  release_date_parsed?: Date | null;
  is_published: boolean;
  is_featured: boolean;
  upcoming?: boolean; // legacy, keeping for backward compatibility temporarily
  phone_status?: string;
  
  // New Ecosystem Fields
  price_status?: string;
  expected_launch_date?: string;
  launch_quarter?: string;
  launch_year?: number;
  leak_confidence?: string;
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

  // Content Optimization
  seo_overview?: string;
  key_highlights?: string[];
  verdict?: string;
  pros?: string[];
  cons?: string[];
  gaming_review?: string;
  camera_review?: string;
  battery_review?: string;

  // FAQ System
  faqs?: { question: string; answer: string }[];

  // Programmatic SEO Section
  primary_keyword?: string;
  secondary_keywords?: string[];
  question_keywords?: string[];
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  seo_slug?: string;
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;

  // SEO Tracking & Auditing
  seo_status?: string;
  seo_score?: number;
  schema_status?: boolean;
  index_status?: string;
  internal_link_count?: number;
  internal_link_score?: number;
  last_seo_audit?: Date | null;
  content_status?: string;

  // Search Console Tracking (Future-Ready)
  gsc_impressions?: number;
  gsc_clicks?: number;
  gsc_ctr?: number;
  gsc_position?: number;
  gsc_last_sync?: Date | null;

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
  price_inr: { type: Number },
  price_eur: { type: Number },
  price_gbp: { type: Number },
  price_official: { type: Number },
  price_unofficial: { type: Number },
  is_official: { type: Boolean, default: true },
  release_date: { type: String },
  release_date_parsed: { type: Date, default: null },
  is_published: { type: Boolean, default: false },
  is_featured: { type: Boolean, default: false },
  upcoming: { type: Boolean, default: false }, // legacy
  phone_status: { type: String, enum: ['released', 'upcoming', 'rumored', 'draft', 'cancelled'], default: 'released' },
  
  // New Ecosystem Fields
  price_status: { type: String, enum: ['official', 'expected', 'rumored', 'unannounced', 'discontinued'], default: 'official' },
  expected_launch_date: { type: String },
  launch_quarter: { type: String },
  launch_year: { type: Number },
  leak_confidence: { type: String, enum: ['low', 'moderate', 'high', 'officially_confirmed'] },
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

  // Content Optimization
  seo_overview: { type: String },
  key_highlights: { type: [String], default: [] },
  verdict: { type: String },
  pros: { type: [String], default: [] },
  cons: { type: [String], default: [] },

  // FAQ System
  faqs: [{ question: String, answer: String }],

  // Programmatic SEO Section
  primary_keyword: { type: String },
  secondary_keywords: { type: [String], default: [] },
  question_keywords: { type: [String], default: [] },
  meta_title: { type: String },
  meta_description: { type: String },
  meta_keywords: { type: String },
  seo_slug: { type: String },
  canonical_url: { type: String },
  og_title: { type: String },
  og_description: { type: String },
  og_image: { type: String },
  twitter_title: { type: String },
  twitter_description: { type: String },

  // SEO Tracking & Auditing
  seo_status: { type: String, enum: ['Red', 'Yellow', 'Green'], default: 'Red' },
  seo_score: { type: Number, default: 0 },
  schema_status: { type: Boolean, default: false },
  index_status: { type: String, enum: ['index', 'noindex'], default: 'index' },
  internal_link_count: { type: Number, default: 0 },
  internal_link_score: { type: Number, default: 0 },
  last_seo_audit: { type: Date, default: null },
  content_status: { type: String, enum: ['Missing', 'Draft', 'Published'], default: 'Missing' },

  // Search Console Tracking (Future-Ready)
  gsc_impressions: { type: Number, default: 0 },
  gsc_clicks: { type: Number, default: 0 },
  gsc_ctr: { type: Number, default: 0 },
  gsc_position: { type: Number, default: 0 },
  gsc_last_sync: { type: Date, default: null },

  // Related Devices
  related_similar_ids: [{ type: Schema.Types.ObjectId, ref: 'Phone' }],
  related_compare_ids: [{ type: Schema.Types.ObjectId, ref: 'Phone' }],
  related_better_ids: [{ type: Schema.Types.ObjectId, ref: 'Phone' }],

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// --- Enterprise MongoDB Indexes for Performance & Search ---
PhoneSchema.index({ is_published: 1, phone_status: 1, release_date_parsed: -1 });
PhoneSchema.index({ brand_id: 1, phone_status: 1 });
PhoneSchema.index({ phone_status: 1, launch_year: 1, launch_quarter: 1 }); // For upcoming filtering
PhoneSchema.index({ brand_id: 1, name: 1 }); // For autocomplete & suggestions
PhoneSchema.index({ name: 'text' }); // Primary text search

export default mongoose.models.Phone || mongoose.model<IPhone>('Phone', PhoneSchema);
