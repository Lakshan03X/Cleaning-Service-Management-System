import BookingModel from "../models/booking.model.js";

// Create a new booking
export const createBooking = async (req, res) => {
  const { customerName, email, serviceType, date, time, address, phone } = req.body;

  if (!customerName || !email || !serviceType || !date || !time || !address) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  try {
    // Check for existing booking with same email, service, date & time
    const bookingExists = await BookingModel.findOne({ email, serviceType, date, time });
    if (bookingExists) {
      return res.status(409).json({
        success: false,
        message: "Booking already exists for the given date and time!",
      });
    }

    const newBooking = new BookingModel({
      customerName,
      address,
      email,
      phone,
      serviceType,
      date,
      time,
    });

    await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (err) {
    console.error("Error:", err.message);
    // Handle duplicate email error (MongoDB error code 11000)
    if (err.code === 11000 && err.keyPattern?.email) {
      return res.status(409).json({
        success: false,
        message: "A booking with this email already exists.",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.find();
    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await BookingModel.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found!",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete all bookings
export const deleteAllBookings = async (req, res) => {
  try {
    await BookingModel.deleteMany();
    res.status(200).json({
      success: true,
      message: "All bookings deleted successfully!",
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete booking by ID
export const deleteBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await BookingModel.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully!",
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update booking status by ID
export const updateBookingStatusById = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !["Pending", "Confirmed", "Completed", "Cancelled"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status value",
    });
  }

  try {
    const updatedBooking = await BookingModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      updatedBooking,
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
