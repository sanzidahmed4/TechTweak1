import mongoose, { Schema, Document } from 'mongoose';

export interface ISetting extends Document {
  // 1. General Settings
  site_name: string;
  site_description: string;
  contact_email: string;
  support_email: string;
  website_url: string;
  copyright_text: string;

  // 2. Branding
  logo_url: string;
  dark_logo_url: string;
  favicon_url: string;
  default_og_image: string;
  default_author_name: string;

  // 3. SEO Settings
  global_meta_title_template: string;
  global_meta_description: string;
  default_keywords: string;
  google_verification_code: string;
  bing_verification_code: string;
  canonical_domain: string;

  // 4. Analytics & Tracking
  google_analytics_id: string;
  google_tag_manager_id: string;
  microsoft_clarity_id: string;
  facebook_pixel_id: string;

  // 5. Social Media
  social_facebook: string;
  social_twitter: string;
  social_youtube: string;
  social_instagram: string;
  social_linkedin: string;
  social_telegram: string;

  // 6. AI Advisor Settings
  enable_ai_advisor: boolean;
  enable_analytics_collection: boolean;
  min_match_score_threshold: number;

  // 7. Maintenance & System
  maintenance_mode: boolean;
  maintenance_message: string;
  hide_search: boolean;
  hide_compare: boolean;
  hide_news_section: boolean;

  // 8. Homepage Controls
  featured_brands: string[];
  featured_phones: string[];
  hero_title: string;
  hero_subtitle: string;

  updated_at: Date;
}

const SettingSchema: Schema = new Schema({
  site_name: { type: String, default: 'TechTweak' },
  site_description: { type: String, default: 'The Ultimate Smartphone Resource' },
  contact_email: { type: String, default: '' },
  support_email: { type: String, default: '' },
  website_url: { type: String, default: 'https://www.techtweak.tech' },
  copyright_text: { type: String, default: '© 2026 TechTweak. All rights reserved.' },

  logo_url: { type: String, default: '' },
  dark_logo_url: { type: String, default: '' },
  favicon_url: { type: String, default: '' },
  default_og_image: { type: String, default: '' },
  default_author_name: { type: String, default: 'TechTweak Team' },

  global_meta_title_template: { type: String, default: '%s | TechTweak' },
  global_meta_description: { type: String, default: '' },
  default_keywords: { type: String, default: '' },
  google_verification_code: { type: String, default: '' },
  bing_verification_code: { type: String, default: '' },
  canonical_domain: { type: String, default: 'https://www.techtweak.tech' },

  google_analytics_id: { type: String, default: '' },
  google_tag_manager_id: { type: String, default: '' },
  microsoft_clarity_id: { type: String, default: '' },
  facebook_pixel_id: { type: String, default: '' },

  social_facebook: { type: String, default: '' },
  social_twitter: { type: String, default: '' },
  social_youtube: { type: String, default: '' },
  social_instagram: { type: String, default: '' },
  social_linkedin: { type: String, default: '' },
  social_telegram: { type: String, default: '' },

  enable_ai_advisor: { type: Boolean, default: true },
  enable_analytics_collection: { type: Boolean, default: true },
  min_match_score_threshold: { type: Number, default: 40 },

  maintenance_mode: { type: Boolean, default: false },
  maintenance_message: { type: String, default: 'We are currently undergoing maintenance. Please check back later.' },
  hide_search: { type: Boolean, default: false },
  hide_compare: { type: Boolean, default: false },
  hide_news_section: { type: Boolean, default: false },

  featured_brands: [{ type: String }],
  featured_phones: [{ type: String }],
  hero_title: { type: String, default: 'Find Your Perfect Phone' },
  hero_subtitle: { type: String, default: 'Compare specs, get AI recommendations, and make the right choice.' },

  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.Setting || mongoose.model<ISetting>('Setting', SettingSchema);
