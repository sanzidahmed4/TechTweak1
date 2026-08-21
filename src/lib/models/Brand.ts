import mongoose, { Schema, Document } from 'mongoose';

export interface IBrand extends Document {
  name: string;
  slug: string;
  logo_url?: string;
  order: number;
  
  // Programmatic SEO
  meta_title?: string;
  meta_description?: string;
  primary_keyword?: string;
  canonical_url?: string;
  og_image?: string;

  // SEO Tracking & Auditing
  seo_status?: string;
  seo_score?: number;
  schema_status?: boolean;
  index_status?: string;
  internal_link_count?: number;
  internal_link_score?: number;
  last_seo_audit?: Date | null;

  created_at: Date;
}

const BrandSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  logo_url: { type: String },
  order: { type: Number, default: 0 },

  // Programmatic SEO
  meta_title: { type: String },
  meta_description: { type: String },
  primary_keyword: { type: String },
  canonical_url: { type: String },
  og_image: { type: String },

  // SEO Tracking & Auditing
  seo_status: { type: String, enum: ['Red', 'Yellow', 'Green'], default: 'Red' },
  seo_score: { type: Number, default: 0 },
  schema_status: { type: Boolean, default: false },
  index_status: { type: String, enum: ['index', 'noindex'], default: 'index' },
  internal_link_count: { type: Number, default: 0 },
  internal_link_score: { type: Number, default: 0 },
  last_seo_audit: { type: Date, default: null },

  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.Brand || mongoose.model<IBrand>('Brand', BrandSchema);
