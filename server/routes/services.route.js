import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  deleteServiceById,
  deleteAllServices,
  updateServiceById,
} from "../controllers/services.controller.js";
// import { verifyToken } from "../../middleware/auth/verifyToken.js";

const router = express.Router();

// Create a new Service (Protected route)
router.post("/create-service", createService);

// Get all Services (Protected route)
router.get("/get-all-services", getAllServices);

// Get a Service by ID (Protected route)
router.get("/get-service/:id", getServiceById);

// Delete Service by ID (Protected route)
router.delete("/delete-service/:id", deleteServiceById);

router.delete("/delete-all-service", deleteAllServices);

// Update Service by ID (Protected route)
router.put("/update-service/:id", updateServiceById);

export default router;
