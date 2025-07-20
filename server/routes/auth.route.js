// // import express from "express";
// // import passport from "passport";

// // const router = express.Router();

// // router.get(
// //   "/google",
// //   passport.authenticate("google", {
// //     scope: ["profile", "email"],
// //     prompt: "select_account",
// //   })
// // );

// // router.get(
// //   "/google/callback",
// //   passport.authenticate("google", {
// //     failureRedirect: "/",
// //     session: true,
// //   }),
// //   (req, res) => {
// //     res.redirect(`${process.env.CLIENT_URL}/dashboard`);
// //   }
// // );

// // router.get("/user", (req, res) => {
// //   if (req.user) return res.json(req.user);
// //   res.status(401).json({ message: "Not authenticated" });
// // });

// // // routes/auth.route.js

// // router.get("/logout", (req, res) => {
// //   req.logout((err) => {
// //     if (err)
// //       return res.status(500).json({ message: "Logout error", error: err });

// //     req.session.destroy((err) => {
// //       if (err)
// //         return res
// //           .status(500)
// //           .json({ message: "Session destroy error", error: err });

// //       res.clearCookie("connect.sid", {
// //         path: "/",
// //         httpOnly: true,
// //         sameSite: "lax",
// //         secure: false, // set to true in HTTPS
// //       });

// //       return res.status(200).json({ message: "Logged out successfully" });
// //     });
// //   });
// // });

// import express from "express";
// import {
//   registerUser,
//   loginUser,
//   getAllUsers,
//   getUserById,
//   deleteUser,
//   updateUser,
// } from "../controllers/user.controller.js";
// import { verifyToken } from "../middlewares/verifyToken.js";
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

// // // routes/auth.route.js

// // router.get("/logout", (req, res) => {
// //   req.logout((err) => {
// //     if (err)
// //       return res.status(500).json({ message: "Logout error", error: err });

// //     req.session.destroy((err) => {
// //       if (err)
// //         return res
// //           .status(500)
// //           .json({ message: "Session destroy error", error: err });

// //       res.clearCookie("connect.sid", {
// //         path: "/",
// //         httpOnly: true,
// //         sameSite: "lax",
// //         secure: false, // set to true in HTTPS
// //       });

// //       return res.status(200).json({ message: "Logged out successfully" });
// //     });
// //   });
// // });

// // User Registration Route (No token needed for registration)
// router.post("/register", registerUser);

// // User Login Route (No token needed for login)
// router.post("/login", loginUser);

// // Get All Users (Protected route, requires token)
// router.get("/get-all-users", getAllUsers);

// // Get User by ID (Protected route, requires token)
// router.get("/get-user/:id", getUserById);

// // Delete User by ID (Protected route, requires token)
// router.delete("/delete-user/:id", deleteUser);

// // Update User (Protected route, requires token)
// router.put("/update-user/:id", updateUser);

// export default router;

import express from "express";
import passport from "passport";
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

// ======= Google OAuth Routes =======

// Start Google OAuth login flow
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: true,
  }),
  (req, res) => {
    // On success, redirect to client dashboard
    res.redirect(`${process.env.CLIENT_URL}/`);
  }
);

// Get currently authenticated user (works for Google or local session)
router.get("/user", (req, res) => {
  if (req.user) return res.json(req.user);
  res.status(401).json({ message: "Not authenticated" });
});

// Logout route to end session and clear cookie
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err)
      return res.status(500).json({ message: "Logout error", error: err });

    req.session.destroy((err) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Session destroy error", error: err });

      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production", // secure true in prod
      });

      return res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

// ======= Local Auth Routes =======

// Register a new user (no token required)
router.post("/register", registerUser);

// Login a user (no token required)
router.post("/login", loginUser);

// ======= Protected User Routes (require verifyToken middleware) =======

// Get all users
router.get("/get-all-users", getAllUsers);

// Get user by ID
router.get("/get-user/:id", getUserById);

// Delete user by ID
router.delete("/delete-user/:id", deleteUser);

// Update user by ID
router.put("/update-user/:id", updateUser);

export default router;
