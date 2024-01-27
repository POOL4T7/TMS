import { Schema, Document, model } from 'mongoose';

export interface IDepartment extends Document {
  name: string;
  slug: string;
  createdBy: string;
  companyId: Schema.Types.ObjectId;
  status: 'active' | 'inactive' | 'deleted';
}

const departmentSchema = new Schema<IDepartment>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'deleted'],
      default: 'inactive',
    },
  },
  { timestamps: true }
);

export default model<IDepartment>('Department', departmentSchema);
