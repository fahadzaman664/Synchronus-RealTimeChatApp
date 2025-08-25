import { Router } from 'express';
import { getContactForDmList, searchContact } from '../controllers/Contact.Controller.js';
import { verifyToken } from '../Middleware/Auth.Middleware.js';
const contactRoutes = Router();

contactRoutes.post('/search',verifyToken, searchContact);
contactRoutes.get('/get-contacts-for-dm', verifyToken,getContactForDmList)

export default contactRoutes;