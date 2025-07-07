// models/Charm.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ICharm extends Document {
    content: string;
    pinned: boolean;
    tags: string[]; // Array of strings
    createdAt: Date;
    updatedAt: Date;
}

const CharmSchema: Schema = new Schema(
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
CharmSchema.index({ content: 'text' });

export default mongoose.models.Charm || mongoose.model<ICharm>('Charm', CharmSchema);