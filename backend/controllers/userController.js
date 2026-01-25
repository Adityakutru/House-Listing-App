import User from "../models/user.model.js";

// GET profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select(
      "-password"
    );

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error loading profile" });
  }
};

// UPDATE profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const updateData = {
      ...req.body,
    };

    // If profilePic uploaded
    if (req.file && req.file.path) {
      updateData.profilePic = req.file.path;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select("-password");

    return res.json({ message: "Profile updated", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error updating profile",
      error: err.message,
    });
  }
};
