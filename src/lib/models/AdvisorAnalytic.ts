import mongoose, { Schema, Document } from 'mongoose';

export interface IAdvisorAnalytic extends Document {
  priority: string;
  budget: string;
  brand: string;
  screen_size: string;
  upgrade_cycle: string;
  search_query?: string;
  is_surprise_me?: boolean;
  best_match_id?: mongoose.Types.ObjectId;
  alternative_id?: mongoose.Types.ObjectId;
  best_value_id?: mongoose.Types.ObjectId;
  session_id?: string;
  created_at: Date;
}

const AdvisorAnalyticSchema: Schema = new Schema({
  priority: { type: String, required: true },
  budget: { type: String, required: true },
  brand: { type: String, required: true },
  screen_size: { type: String, required: true },
  upgrade_cycle: { type: String, required: true },
  search_query: { type: String },
  is_surprise_me: { type: Boolean, default: false },
  best_match_id: { type: Schema.Types.ObjectId, ref: 'Phone' },
  alternative_id: { type: Schema.Types.ObjectId, ref: 'Phone' },
  best_value_id: { type: Schema.Types.ObjectId, ref: 'Phone' },
  session_id: { type: String },
  created_at: { type: Date, default: Date.now },
});

// Indexes for fast dashboard aggregations
AdvisorAnalyticSchema.index({ priority: 1, created_at: -1 });
AdvisorAnalyticSchema.index({ budget: 1, created_at: -1 });
AdvisorAnalyticSchema.index({ brand: 1, created_at: -1 });
AdvisorAnalyticSchema.index({ created_at: -1 });

export default mongoose.models.AdvisorAnalytic || mongoose.model<IAdvisorAnalytic>('AdvisorAnalytic', AdvisorAnalyticSchema);
