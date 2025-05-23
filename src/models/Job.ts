import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  user: mongoose.Types.ObjectId;
  company: string;
  role: string;
  location: string;
  isRemote: boolean;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  tags: string[];
  notes: string;
}

const JobSchema: Schema = new Schema<IJob>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    company: { type: String, required: true },
    role: { type: String, required: true },
    location: {
      country: { type: String }, // ISO code or full name
      state: { type: String },
      city: { type: String },
    },
    isRemote: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
      default: 'Applied',
    },
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model<IJob>('Job', JobSchema);
