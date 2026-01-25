import User from "../models/user.model.js";
import House from "../models/house.model.js";

// List all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

// List all houses (admin view)
export const getAllHousesAdmin = async (req, res) => {
  try {
    const houses = await House.find();
    res.json(houses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching houses" });
  }
};

// Delete any house
export const deleteHouseAdmin = async (req, res) => {
  try {
    await House.findByIdAndDelete(req.params.id);
    res.json({ message: "House deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting house" });
  }
};
