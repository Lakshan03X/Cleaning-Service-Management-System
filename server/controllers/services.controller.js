import ServicesModel from "../models/services.model.js";

// Create a new service
export const createService = async (req, res) => {
  const { serviceName, description, price } = req.body;

  if (!serviceName || !price) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  try {
    let serviceExists = await ServicesModel.findOne({ serviceName });
    if (serviceExists) {
      return res.status(409).json({
        success: false,
        message: "Service already exists!",
      });
    }

    const newService = new ServicesModel({
      serviceName,
      description,
      price,
    });

    await newService.save();

    res.status(201).json({
      success: true,
      message: "Service added successfully",
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await ServicesModel.find();
    res.status(200).json({
      success: true,
      services,
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get service by ID
export const getServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await ServicesModel.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found!",
      });
    }

    res.status(200).json({
      success: true,
      service,
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete all services
export const deleteAllServices = async (req, res) => {
  try {
    await ServicesModel.deleteMany();

    res.status(200).json({
      success: true,
      message: "All services deleted successfully!",
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete service by ID
export const deleteServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await ServicesModel.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully!",
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update service by ID
export const updateServiceById = async (req, res) => {
  const { id } = req.params;
  const { serviceName, description, price } = req.body;

  if (!serviceName || !price) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  try {
    const updatedService = await ServicesModel.findByIdAndUpdate(
      id,
      { serviceName, description, price },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({
        success: false,
        message: "Service not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      updatedService,
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
