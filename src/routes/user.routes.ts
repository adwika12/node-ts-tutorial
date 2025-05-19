import express from 'express';
import UserController from '../controller/user.controller';

const router = express.Router();
const userController = new UserController();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/list', userController.userList);

export default router;
