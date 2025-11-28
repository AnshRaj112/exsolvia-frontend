import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  name: string;
  email: string;
  phone: string;
  position: string;
  resume: string; // URL or file path
  coverLetter?: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
  message?: string;
  status?: 'pending' | 'reviewed' | 'interview phase' | 'onboarding' | 'rejected';
  createdAt?: Date;
  updatedAt?: Date;
}

const ApplicationSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
    },
    resume: {
      type: String,
      required: [true, 'Resume is required'],
      trim: true,
    },
    coverLetter: {
      type: String,
      trim: true,
    },
    portfolio: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'interview phase', 'onboarding', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);

export default Application;

