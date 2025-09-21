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
    pinned: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    }
  },
  {
    timestamps: true,
  }
);

// Add compound index for sorting. This is the most critical fix.
RawSchema.index({ pinned: -1, createdAt: -1 });

// Add index on tags for faster regex search
RawSchema.index({ tags: 1 });

// The text index is correct for full-text search.
RawSchema.index({ content: 'text' });

export default mongoose.models.Raw || mongoose.model<IRaw>('Raw', RawSchema);
