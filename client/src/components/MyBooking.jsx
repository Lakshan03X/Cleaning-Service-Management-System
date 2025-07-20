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
import {
  getBookings,
  deleteBookingById,
  updateBookingById,
  getServices, // Make sure to import this or define it
} from "../middlewares/api";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";

export default function MyBookings({
  bookings,
  setBookings,
  setEditingIndex, // you use this but it seems unused or incomplete, might remove or fix usage
  userEmail,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [editingData, setEditingData] = useState(null); // holds the booking being edited (with index)
  const [services, setServices] = useState([]);

  // Filter bookings to only user's bookings
  const filteredBookings = bookings.filter((b) => b.email === userEmail);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        setServices(response.data.services);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await getBookings();
        setBookings(response.data.bookings);
      } catch (err) {
        setError("Error fetching bookings");
        toast.error("Failed to fetch bookings");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [setBookings, reloadTrigger]);

  // Cancel booking
  const handleCancel = async (id) => {
    try {
      await deleteBookingById(id);
      setBookings((b) => b.filter((booking) => booking._id !== id));
      setReloadTrigger((prev) => !prev);
      toast.success("Booking cancelled successfully");
    } catch (err) {
      console.error("Error deleting booking:", err);
      setError("Failed to cancel booking");
      toast.error("Failed to cancel booking");
    }
  };

  // Save updated booking
  const handleSave = async (id) => {
    if (!editingData) return;
    try {
      // Prepare payload (remove index before sending)
      const { index, ...dataToUpdate } = editingData;
      await updateBookingById(id, dataToUpdate);
      toast.success("Booking updated successfully");
      setEditingData(null);
      setEditingIndex(null); // you may want to handle this prop more clearly in parent
      setReloadTrigger((prev) => !prev);
    } catch (err) {
      console.error("Error updating booking:", err);
      toast.error("Failed to update booking");
    }
  };

  // Handle input changes in editing mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      ) : filteredBookings.length === 0 ? (
        <p className="text-gray-600 text-center">No bookings yet.</p>
      ) : (
        <ul className="space-y-6">
          {filteredBookings.map((b, i) => {
            const isEditing = editingData?.index === i;
            return (
              <li
                key={b._id}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row md:justify-between md:items-center transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
              >
                <div className="space-y-3 text-gray-700 flex-1">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="customerName"
                        value={editingData.customerName || ""}
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-1 w-full mb-2"
                        placeholder="Customer Name"
                      />
                      <input
                        type="text"
                        name="address"
                        value={editingData.address || ""}
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-1 w-full mb-2"
                        placeholder="Address"
                      />
                      <input
                        type="date"
                        name="date"
                        value={dayjs(editingData.date).format("YYYY-MM-DD") || ""}
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-1 w-full mb-2"
                      />
                      <input
                        type="time"
                        name="time"
                        value={editingData.time || ""}
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-1 w-full mb-2"
                      />
                      <select
                        name="serviceType"
                        value={editingData.serviceType || ""}
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-1 w-full mb-2"
                      >
                        {services.map((service, index) => (
                          <option key={index} value={service.serviceName}>
                            {service.serviceName}
                          </option>
                        ))}
                      </select>

                      <input
                        type="text"
                        name="status"
                        value={editingData.status || ""}
                        disabled
                        className="border border-gray-300 rounded p-1 w-full mb-2 bg-gray-100 cursor-not-allowed"
                        placeholder="Status"
                      />
                    </>
                  ) : (
                    <>
                      <p className="flex items-center gap-3 text-lg">
                        <FiUser className="text-teal-600 text-xl" />{" "}
                        {b.customerName}
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
                        <FiLayers className="text-teal-600 text-xl" />{" "}
                        {b.serviceType}
                      </p>
                      <p className="text-sm px-3 py-1 inline-block bg-gray-100 rounded-full text-teal-700 border border-teal-300">
                        {b.status}
                      </p>
                    </>
                  )}
                </div>
                <div className="flex gap-4 mt-4 md:mt-0">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => handleSave(b._id)}
                        className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingIndex(null);
                          setEditingData(null);
                        }}
                        className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingIndex(i);
                          setEditingData({ ...b, index: i });
                        }}
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
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
