import mongoose, { Document, Schema } from "mongoose";

// Define job status type
export type JobStatus = "Applied" | "Interview" | "Offer" | "Rejected" | "Saved";

// Define contact info interface
interface IContactInfo {
  name?: string;
  email?: string;
  phone?: string;
}

// Define job interface
export interface IJob extends Document {
  company: string;
  position: string;
  location?: string;
  status: JobStatus;
  applicationDate: Date;
  notes?: string;
  url?: string;
  contactInfo?: IContactInfo;
  salary?: string;
  reminderDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected", "Saved"],
      default: "Applied",
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      trim: true,
    },
    contactInfo: {
      name: String,
      email: String,
      phone: String,
    },
    salary: {
      type: String,
      trim: true,
    },
    reminderDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IJob>("Job", JobSchema);
