import React, { useState, useEffect } from "react";

const ServiceForm = ({ service, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    price: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (service) {
      setFormData({
        serviceName: service.serviceName,
        description: service.description || "",
        price: service.price,
      });
    } else {
      setFormData({ serviceName: "", description: "", price: "" });
    }
  }, [service]);

  const validate = () => {
    const errs = {};
    if (!formData.serviceName.trim())
      errs.serviceName = "Service name is required.";
    if (!formData.price || formData.price <= 0)
      errs.price = "Price must be a positive number.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start z-50">
      <div className="bg-white w-full max-w-md h-screen overflow-y-auto p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-xl font-bold mb-4">
          {service ? "Edit" : "Add"} Service
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Service Name</label>
            <input
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.serviceName && <p className="text-red-500">{errors.serviceName}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded">
              {service ? "Update" : "Add"} Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
