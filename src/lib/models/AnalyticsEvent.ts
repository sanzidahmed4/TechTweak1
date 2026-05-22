import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalyticsEvent extends Document {
  path: string;
  type: 'page_view' | 'phone_view' | 'article_view';
  entity_id?: mongoose.Types.ObjectId;
  user_agent?: string;
  session_id?: string;
  created_at: Date;
}

const AnalyticsEventSchema: Schema = new Schema({
  path: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['page_view', 'phone_view', 'article_view'], 
    default: 'page_view' 
  },
  entity_id: { type: Schema.Types.ObjectId },
  user_agent: { type: String },
  session_id: { type: String }, // To track unique visitors (simplified hash of IP+UA or a cookie)
  created_at: { type: Date, default: Date.now },
});

// Indexes for fast querying
AnalyticsEventSchema.index({ created_at: -1 });
AnalyticsEventSchema.index({ path: 1, created_at: -1 });
AnalyticsEventSchema.index({ entity_id: 1, type: 1 });
AnalyticsEventSchema.index({ session_id: 1, created_at: -1 });

export default mongoose.models.AnalyticsEvent || mongoose.model<IAnalyticsEvent>('AnalyticsEvent', AnalyticsEventSchema);
