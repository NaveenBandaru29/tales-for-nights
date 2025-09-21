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

// Add a compound index for sorting on `pinned` and `createdAt`
CharmSchema.index({ pinned: -1, createdAt: -1 });

// To optimize for search, you can add a compound text index
CharmSchema.index({ content: 'text', tags: 'text' });

export default mongoose.models.Charm || mongoose.model<ICharm>('Charm', CharmSchema);
