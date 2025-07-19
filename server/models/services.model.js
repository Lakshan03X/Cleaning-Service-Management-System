import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const ServicesModel = mongoose.model("Services", servicesSchema);
export default ServicesModel;
