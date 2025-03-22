// models/Raw.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IRaw extends Document {
  content: string;
  pinned: boolean;
  tags: string[]; // Array of strings
  createdAt: Date;
  updatedAt: Date;
}

const RawSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
    },
    pinned: {  // Define the pinned field
      type: Boolean,
      default: false, // Default value is false, you can change it if needed
    },
    tags: {
      type: [String], // Define as an array of strings
      default: [], // Default is an empty array
    }
  },
  {
    timestamps: true,
  }
);

// Add text index for searching
RawSchema.index({ content: 'text' });

export default mongoose.models.Raw || mongoose.model<IRaw>('Raw', RawSchema);