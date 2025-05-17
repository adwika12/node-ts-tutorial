import  { model, Schema } from 'mongoose';
import * as UserInterface from '../interface/user';
// Define User Schema Interface


const schema = new Schema<UserInterface.IUser>({
    email:{
         type:Schema.Types.String
    },
    password:{
        type:Schema.Types.String
    },
    email_otp:{
        type:Schema.Types.Number
    },
    email_status:{
        type:Schema.Types.Boolean,
    },
    isActive:{
        type:Schema.Types.Boolean
    }
});
export const UserModel = model<UserInterface.IUser>("auth", schema);