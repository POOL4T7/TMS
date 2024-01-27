import  { Document,  Types } from 'mongoose';

interface ICompany  {
  name: string;
  industry: Types.ObjectId;
  email: string;
  phone: string;
  user: Types.ObjectId;
}

export default ICompany;