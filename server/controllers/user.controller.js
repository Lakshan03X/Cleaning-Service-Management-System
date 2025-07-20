import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/generateToken.js";
import UserModel from "../models/user.model.js";

// User Registration
export const registerUser = async (req, res) => {
  const { email, fullName, address, phone, password, gender, role } = req.body;

  if (!email || !fullName || !address || !password || !gender) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User already exists!",
      });
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be exactly 10 digits!",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters!",
      });
    }

    const newUser = new UserModel({
      email,
      fullName,
      address,
      phone,
      password,
      gender,
      role: role || "User", // default to "User" if not provided
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("Registration Error:", err);
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists!",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// User Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check for missing input
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password",
    });
  }

  try {
    // Check if user exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    console.error("Get Users Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("Get User By ID Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (err) {
    console.error("Delete User Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update user details
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, fullName, address, phone, password, gender, role } = req.body;

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be exactly 10 digits!",
      });
    }

    if (password && password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters!",
      });
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    user.email = email || user.email;
    user.fullName = fullName || user.fullName;
    user.address = address || user.address;
    user.phone = phone || user.phone;
    user.gender = gender || user.gender;
    user.role = role || user.role; // allow role updates

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      user,
    });
  } catch (err) {
    console.error("Update User Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
