import mongoose, { Schema, Document } from 'mongoose';

export interface IBacklink extends Document {
  target_url: string; // The TechTweak URL receiving the link
  source_url: string; // The external URL linking to us
  domain: string; // The root domain of the source (e.g., theverge.com)
  domain_authority?: number; // DA/DR metric (0-100)
  anchor_text?: string;
  is_dofollow: boolean;
  status: 'Outreach_Sent' | 'Negotiating' | 'Live' | 'Lost' | 'Rejected';
  contact_email?: string;
  price?: number; // If it was a paid placement
  date_acquired?: Date;
  created_at: Date;
  updated_at: Date;
}

const BacklinkSchema: Schema = new Schema({
  target_url: { type: String, required: true },
  source_url: { type: String, required: true },
  domain: { type: String, required: true },
  domain_authority: { type: Number, min: 0, max: 100 },
  anchor_text: { type: String },
  is_dofollow: { type: Boolean, default: true },
  status: { 
    type: String, 
    enum: ['Outreach_Sent', 'Negotiating', 'Live', 'Lost', 'Rejected'],
    default: 'Outreach_Sent'
  },
  contact_email: { type: String },
  price: { type: Number, default: 0 },
  date_acquired: { type: Date },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Prevent duplicate backlinks from the exact same source URL to the exact same target URL
BacklinkSchema.index({ target_url: 1, source_url: 1 }, { unique: true });

export default mongoose.models.Backlink || mongoose.model<IBacklink>('Backlink', BacklinkSchema);
