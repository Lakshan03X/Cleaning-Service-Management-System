import { useState, useEffect } from "react";
import {
  FiUser,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiLayers,
  FiEdit,
} from "react-icons/fi";
import { createBooking } from "../middlewares/api";
import { toast } from "react-hot-toast";

const SERVICE_TYPES = [
  { name: "Deep Cleaning", price: 120 },
  { name: "Carpet Cleaning", price: 80 },
  { name: "Window Cleaning", price: 60 },
  { name: "Office Cleaning", price: 150 },
  { name: "Move-out Cleaning", price: 200 },
];

export default function AddBooking({
  bookings,
  setBookings,
  editingIndex,
  setEditingIndex,
}) {
  const initialForm = {
    customerName: "",
    address: "",
    date: "",
    time: "",
    serviceType: SERVICE_TYPES[0].name,
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editingIndex !== null) {
      setForm(bookings[editingIndex]);
    } else {
      setForm(initialForm);
    }
  }, [editingIndex, bookings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const validateForm = () => {
    if (!form.customerName || !form.address || !form.date || !form.time) {
      setError("All fields are required.");
      toast.error("All fields are required.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (editingIndex !== null) {
        const updatedBookings = [...bookings];
        updatedBookings[editingIndex] = form;
        setBookings(updatedBookings);
        setEditingIndex(null);
        toast.success("Booking updated successfully!");
      } else {
        const dummyEmail = `${form.customerName
          .replace(/\s+/g, "_")
          .toLowerCase()}@noemail.com`;

        const bookingPromise = createBooking({
          ...form,
          email: dummyEmail,
          phone: null,
        });

        toast.promise(bookingPromise, {
          loading: "Booking...",
          success: (res) => {
            setBookings((prev) => [...prev, res.booking]);
            return <b>Booking created successfully!</b>;
          },
          error: <b>Booking is not created!</b>,
        });

        await bookingPromise;
      }

      setForm(initialForm);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "An error occurred while saving the booking.";
      setError(message);
      toast.error(message);
      console.error("Error submitting booking:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-8 max-w-xl mx-auto"
    >
      <h2 className="text-3xl font-semibold text-teal-600 mb-8 text-center">
        {editingIndex !== null ? "Edit Booking" : "Add New Booking"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <label className="flex flex-col">
          <div className="flex items-center gap-2 mb-2 text-gray-700 font-semibold">
            <FiUser className="text-teal-600" /> Customer Name
          </div>
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            placeholder="Your full name"
            className="mt-1 p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none transition"
          />
        </label>

        <label className="flex flex-col">
          <div className="flex items-center gap-2 mb-2 text-gray-700 font-semibold">
            <FiMapPin className="text-teal-600" /> Address
          </div>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Service location"
            className="mt-1 p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none transition"
          />
        </label>

        <label className="flex flex-col">
          <div className="flex items-center gap-2 mb-2 text-gray-700 font-semibold">
            <FiCalendar className="text-teal-600" /> Date
          </div>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="mt-1 p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none transition"
          />
        </label>

        <label className="flex flex-col">
          <div className="flex items-center gap-2 mb-2 text-gray-700 font-semibold">
            <FiClock className="text-teal-600" /> Time
          </div>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="mt-1 p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none transition"
          />
        </label>

        <label className="flex flex-col md:col-span-2">
          <div className="flex items-center gap-2 mb-2 text-gray-700 font-semibold">
            <FiLayers className="text-teal-600" /> Service Type
          </div>
          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            className="mt-1 p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none transition"
          >
            {SERVICE_TYPES.map(({ name }) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-8 bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-300 w-full md:w-auto font-semibold text-lg flex items-center justify-center gap-3"
      >
        {loading ? (
          <span>Loading...</span>
        ) : editingIndex !== null ? (
          <>
            <FiEdit /> Update Booking
          </>
        ) : (
          <>
            <FiCalendar /> Book Service
          </>
        )}
      </button>
    </form>
  );
}
