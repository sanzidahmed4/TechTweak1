import mongoose, { Schema, Document } from 'mongoose';

export interface IActivityLog extends Document {
  title: string;
  type: 'Phone' | 'Brand' | 'Post' | 'Category' | 'Setting' | 'System';
  action: 'Create' | 'Update' | 'Delete' | 'Publish' | 'Other';
  icon: string; // e.g., 'Smartphone', 'FileText', 'Settings'
  color: string; // e.g., 'text-blue-500 bg-blue-50'
  created_at: Date;
}

const ActivityLogSchema: Schema = new Schema({
  title: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Phone', 'Brand', 'Post', 'Category', 'Setting', 'System'], 
    required: true 
  },
  action: { 
    type: String, 
    enum: ['Create', 'Update', 'Delete', 'Publish', 'Other'], 
    required: true 
  },
  icon: { type: String, default: 'Activity' },
  color: { type: String, default: 'text-slate-500 bg-slate-50' },
  created_at: { type: Date, default: Date.now },
});

// Index for efficient sorting by newest
ActivityLogSchema.index({ created_at: -1 });

export default mongoose.models.ActivityLog || mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);
