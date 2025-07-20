import React, { useState, useEffect } from "react";

const BookingForm = ({ booking, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    serviceType: "",
    date: "",
    time: "",
    address: "",
    phone: "",
    status: "Pending",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (booking) {
      setFormData({
        customerName: booking.customerName,
        email: booking.email,
        serviceType: booking.serviceType,
        date: booking.date,
        time: booking.time,
        address: booking.address,
        phone: booking.phone || "",
        status: booking.status || "Pending",
      });
    }
  }, [booking]);

  const validate = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) newErrors.customerName = "Customer name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid.";
    if (!formData.serviceType.trim()) newErrors.serviceType = "Service type is required.";
    if (!formData.date.trim()) newErrors.date = "Date is required.";
    if (!formData.time.trim()) newErrors.time = "Time is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (formData.phone && !/^[0-9+\s\-()]{7,15}$/.test(formData.phone)) newErrors.phone = "Phone number is invalid.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start z-50">
    <div className="bg-white w-full max-w-4xl h-[95%] overflow-y-auto p-8 rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-semibold mb-6 text-center text-teal-600">
          {booking ? "Edit Booking" : "Add New Booking"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
            {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Service Type</label>
            <input
              type="text"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
            {errors.serviceType && <p className="text-red-500 text-sm">{errors.serviceType}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
            {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Phone (optional)</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {booking && (
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          )}

          <div className="md:col-span-2 flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-3 rounded hover:bg-teal-700"
            >
              {booking ? "Update Booking" : "Add Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
