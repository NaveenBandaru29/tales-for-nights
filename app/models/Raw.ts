// models/Raw.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IRaw extends Document {
  content: string;
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
  },
  {
    timestamps: true,
  }
);

// Add text index for searching
RawSchema.index({ content: 'text' });

export default mongoose.models.Raw || mongoose.model<IRaw>('Raw', RawSchema);