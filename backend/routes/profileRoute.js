import express from 'express'
import authUser from '../middleware/auth.js';
import { changePassword } from '../controllers/profileController.js';

const profileRouter = express.Router();

profileRouter.post('/change-password', authUser, changePassword)

export default profileRouter;