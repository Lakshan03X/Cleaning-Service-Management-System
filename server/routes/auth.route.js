// import express from "express";
// import passport from "passport";

// const router = express.Router();

// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//     prompt: "select_account", // 👈 This forces account selection
//   })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/",
//     session: true,
//   }),
//   (req, res) => {
//     res.redirect(`${process.env.CLIENT_URL}/dashboard`);
//   }
// );

// router.get("/user", (req, res) => {
//   if (req.user) return res.json(req.user);
//   res.status(401).json({ message: "Not authenticated" });
// });

// // routes/auth.route.js

// router.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err)
//       return res.status(500).json({ message: "Logout error", error: err });

//     req.session.destroy((err) => {
//       if (err)
//         return res
//           .status(500)
//           .json({ message: "Session destroy error", error: err });

//       res.clearCookie("connect.sid", {
//         path: "/",
//         httpOnly: true,
//         sameSite: "lax",
//         secure: false, // set to true in HTTPS
//       });

//       return res.status(200).json({ message: "Logged out successfully" });
//     });
//   });
// });

// export default router;

import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// User Registration Route (No token needed for registration)
router.post("/register", registerUser);

// User Login Route (No token needed for login)
router.post("/login", loginUser);

// Get All Users (Protected route, requires token)
router.get("/get-all-users", getAllUsers);

// Get User by ID (Protected route, requires token)
router.get("/get-user/:id", getUserById);

// Delete User by ID (Protected route, requires token)
router.delete("/delete-user/:id", deleteUser);

// Update User (Protected route, requires token)
router.put("/update-user/:id", updateUser);

export default router;
