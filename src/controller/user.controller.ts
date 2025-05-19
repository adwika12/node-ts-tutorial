import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  private userService = new UserService();

  register = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await this.userService.register({ email, password });
      res.status(201).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error during registration" });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const { token, user } = await this.userService.login({ email, password });
      res.json({ token, user });
    } catch (error: any) {
      res.status(401).json({ message: error.message || "Invalid credentials" });
    }
  };

  userList = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getUserList();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  };
}

export default UserController;
