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

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: true,
  }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/`);
  }
);

router.get("/user", (req, res) => {
  if (req.user) return res.json(req.user);
  res.status(401).json({ message: "Not authenticated" });
});

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
        secure: process.env.NODE_ENV === "production",
      });

      return res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/get-all-users", getAllUsers);
router.get("/get-user/:id", getUserById);
router.delete("/delete-user/:id", deleteUser);
router.put("/update-user/:id", updateUser);

export default router;