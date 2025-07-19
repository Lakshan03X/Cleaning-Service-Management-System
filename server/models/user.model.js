import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Prefer not to say"],
      default: "Prefer not to say",
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    address: {
      type: String,
    },
    googleId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
