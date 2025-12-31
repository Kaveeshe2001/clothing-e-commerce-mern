import express from 'express'
import authUser from '../middleware/auth.js';
import { changePassword, getProfile, updateProfile } from '../controllers/profileController.js';

const profileRouter = express.Router();

profileRouter.get("/list", authUser, getProfile);
profileRouter.put("/update", authUser, updateProfile);
profileRouter.post('/change-password', authUser, changePassword)

export default profileRouter;