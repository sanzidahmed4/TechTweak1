import mongoose, { Schema, Document } from 'mongoose';

export interface IBrand extends Document {
  name: string;
  slug: string;
  logo_url?: string;
  order: number;
  created_at: Date;
}

const BrandSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  logo_url: { type: String },
  order: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.Brand || mongoose.model<IBrand>('Brand', BrandSchema);
