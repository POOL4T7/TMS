import mongoose, { Schema, Document } from 'mongoose';

export interface IIndustry extends Document {
  name: string;
  slug: string;
  description: string;
}

const industrySchema = new Schema<IIndustry>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'industries',
  }
);

const Industry = mongoose.model<IIndustry>('Industry', industrySchema);

export default Industry;
