import { Router } from 'express';
import { searchContact } from '../controllers/Contact.Controller.js';
import { verifyToken } from '../Middleware/Auth.Middleware.js';
const contactRoutes = Router();

contactRoutes.post('/search',verifyToken, searchContact)

export default contactRoutes;