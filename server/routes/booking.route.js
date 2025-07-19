import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  deleteAllBookings,
  deleteBookingById,
  updateBookingStatusById,
} from "../controllers/bookng.controller.js";
// import { verifyToken } from "../../middleware/auth/verifyToken.js";

const router = express.Router();

// Create a new Booking (Protected route)
router.post("/create-booking", createBooking);

// Get all Bookings (Protected route)
router.get("/get-all-bookings", getAllBookings);

// Get a Booking by ID (Protected route)
router.get("/get-booking/:id", getBookingById);

// Delete Booking by ID (Protected route)
router.delete("/delete-all-bookings", deleteAllBookings);

router.delete("/delete-bookings/:id", deleteBookingById);

// Update Booking Status (Protected route)
router.put("/update-booking-status/:id", updateBookingStatusById);

export default router;
