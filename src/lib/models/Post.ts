import mongoose, { Schema, Document } from 'mongoose';
import './Category'; // Prevent MissingSchemaError during populate
export interface IPost extends Document {
  title: string;
  slug: string;
  category_id?: mongoose.Types.ObjectId;
  content: string;
  excerpt?: string;
  tags?: string[];
  featured_image?: string;
  author_id?: mongoose.Types.ObjectId;
  is_published: boolean;
  published_at?: Date | null;
  
  // Programmatic SEO Section
  primary_keyword?: string;
  secondary_keywords?: string[];
  canonical_url?: string;
  meta_title?: string;
  meta_description?: string;
  og_title?: string;
  og_description?: string;
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

  views: number;
  created_at: Date;
  updated_at: Date;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'Category' },
  content: { type: String, required: true },
  excerpt: { type: String },
  tags: [{ type: String }],
  featured_image: { type: String },
  author_id: { type: Schema.Types.ObjectId, ref: 'User' },
  is_published: { type: Boolean, default: false },
  published_at: { type: Date, default: null },

  // Programmatic SEO Section
  primary_keyword: { type: String },
  secondary_keywords: { type: [String], default: [] },
  canonical_url: { type: String },
  meta_title: { type: String },
  meta_description: { type: String },
  og_title: { type: String },
  og_description: { type: String },
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

  views: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
