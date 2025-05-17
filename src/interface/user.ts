
export interface IUser extends Document {
    email: string;
    password: string;
    email_otp?: number;  // Optional field
    email_status?: boolean;
    isActive?: boolean;
}