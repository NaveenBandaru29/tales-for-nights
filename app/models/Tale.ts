// models/Tale.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITale extends Document {
  title: string;
  description: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaleSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

// Check if the model already exists to prevent overwriting during hot reloads
export default mongoose.models.Tale || mongoose.model<ITale>('Tale', TaleSchema);
