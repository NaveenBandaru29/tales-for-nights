import mongoose, { Schema, Document } from 'mongoose';

export interface ITale extends Document {
  title: string;
  description: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const TaleSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Add an index on the 'createdAt' field
TaleSchema.index({ createdAt: -1 });

// Check if the model already exists to prevent overwriting during hot reloads
export default mongoose.models.Tale || mongoose.model<ITale>('Tale', TaleSchema);