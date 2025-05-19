import UserModel from '../model/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../interface/user';

const JWT_SECRET = "your_jwt_secret_key"; // Ideally use env variable

class UserService {
  async register(data: { email: string, password: string }) {
    const existingUser = await UserModel.findOne({ email: data.email });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await UserModel.create({
      email: data.email,
      password: hashedPassword
    });
    return newUser;
  }

  async login(data: { email: string, password: string }) {
    const user = await UserModel.findOne({ email: data.email });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d"
    });

    return { token, user };
  }

  async getUserList() {
    return await UserModel.find();
  }
}

export default UserService;
