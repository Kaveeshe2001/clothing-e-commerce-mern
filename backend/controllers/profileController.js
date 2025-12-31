import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

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


