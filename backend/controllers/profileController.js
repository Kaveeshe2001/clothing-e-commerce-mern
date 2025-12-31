import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

// get profile info
export const getProfile = async (req, res) => {
  const user = await userModel.findById(req.userId).select("-password");
  res.json({ success: true, user });
};

// update profile info
export const updateProfile = async (req, res) => {
  const { name, phone, email } = req.body;

  await userModel.findByIdAndUpdate(req.userId, {
    name, phone, email
  });

  res.json({ success: true, message: "Profile updated" });
};


// change password
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await userModel.findById(req.userId);

  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) {
    return res.json({ success: false, message: "Wrong current password" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ success: true, message: "Password updated" });
};


