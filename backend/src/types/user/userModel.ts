import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  uniqueIds: string[]; 
  email?: string;
  phoneNumber?: string;
  properties: { [key: string]: any };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    uniqueIds: { type: [String], required: true },
    email: { type: String, index: true },
    phoneNumber: { type: String, index: true },
    properties: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

const UserModel = model<IUser>('User', userSchema);

export default UserModel;
