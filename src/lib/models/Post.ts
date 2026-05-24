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
  meta_title?: string;
  meta_description?: string;
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
  meta_title: { type: String },
  meta_description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
