import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../interface/user'; // adjust path & interface name

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email_otp: { type: Number },
  email_status: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

const UserModel = mongoose.model<IUser & Document>('User', UserSchema);

export default UserModel;
