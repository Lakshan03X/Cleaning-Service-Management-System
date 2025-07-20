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

app.set("trust proxy", 1);

// ✅ Use environment variables for allowed origins
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.PROD_CLIENT_URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultSecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/service", serviceRoute);
app.use("/booking", bookingRoute);

// Start server
const PORT = process.env.PORT || 5001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
