import { useState, useEffect } from "react";
import {
  FiEdit,
  FiTrash2,
  FiUser,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiLayers,
} from "react-icons/fi";
import { getBookings, deleteBookingById } from "../middlewares/api.js";
import dayjs from "dayjs";
import { toast } from "react-hot-toast"; // ✅ Added toast

export default function MyBookings({ bookings, setBookings, setEditingIndex }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await getBookings();
        setBookings(response.data.bookings);
      } catch (err) {
        setError("Error fetching bookings");
        toast.error("Failed to fetch bookings"); // ✅ Show error toast
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [setBookings, reloadTrigger]);

  const handleCancel = async (id) => {
    try {
      await deleteBookingById(id);
      setBookings((b) => b.filter((booking) => booking.id !== id));
      setReloadTrigger((prev) => !prev);
      toast.success("Booking cancelled successfully"); // ✅ Success toast
    } catch (err) {
      console.error("Error deleting booking:", err);
      setError("Failed to cancel booking");
      toast.error("Failed to cancel booking"); // ✅ Error toast
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-teal-600 mb-6 text-center">
        Your Bookings
      </h2>

      {loading ? (
        <p className="text-gray-600 text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-600 text-center">No bookings yet.</p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((b, i) => (
            <li
              key={b._id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row md:justify-between md:items-center transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            >
              <div className="space-y-3 text-gray-700">
                <p className="flex items-center gap-3 text-lg">
                  <FiUser className="text-teal-600 text-xl" /> {b.customerName}
                </p>
                <p className="flex items-center gap-3 text-lg">
                  <FiMapPin className="text-teal-600 text-xl" /> {b.address}
                </p>
                <p className="flex items-center gap-3 text-lg">
                  <FiCalendar className="text-teal-600 text-xl" />{" "}
                  {dayjs(b.date).format("MMMM D, YYYY")}
                </p>
                <p className="flex items-center gap-3 text-lg">
                  <FiClock className="text-teal-600 text-xl" /> {b.time}
                </p>
                <p className="flex items-center gap-3 text-lg">
                  <FiLayers className="text-teal-600 text-xl" /> {b.serviceType}
                </p>
                <p className="text-sm px-3 py-1 inline-block bg-gray-100 rounded-full text-teal-700 border border-teal-300">
                  {b.status}
                </p>
              </div>
              <div className="flex gap-4 mt-4 md:mt-0">
                <button
                  onClick={() => setEditingIndex(i)}
                  className="px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition flex items-center gap-2"
                >
                  <FiEdit /> Edit
                </button>
                <button
                  onClick={() => handleCancel(b._id)}
                  className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                >
                  <FiTrash2 /> Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
