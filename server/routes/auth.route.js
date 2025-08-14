import {Router} from 'express';
import { signup, login,getUserInfo, updateProfile} from '../controllers/Auth.Controller.js';
import { verifyToken } from '../Middleware/Auth.Middleware.js';

const authRoutes = Router();

authRoutes.post('/signup', signup)
authRoutes.post('/login', login);
authRoutes.get('/user-info',verifyToken,getUserInfo);
authRoutes.post('/update-profile', verifyToken,updateProfile)
export default authRoutes;