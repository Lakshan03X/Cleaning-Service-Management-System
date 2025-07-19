import cors from "cors";
import session from "express-session";
import passport from "passport";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConnect.js";
import authRoutes from "./routes/auth.route.js";
import serviceRoute from "./routes/services.route.js";
import bookingRoute from "./routes/booking.route.js";
import "./config/passport.js";

dotenv.config();
const app = express();

app.set("trust proxy", 1); // required for some hosting platforms

app.use(
  cors({
    origin: process.env.CLIENT_URL, // should be 'http://localhost:5173'
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/service", serviceRoute);
app.use("/booking", bookingRoute);

const PORT = process.env.PORT || 5001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
