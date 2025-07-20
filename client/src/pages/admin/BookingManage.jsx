import React, { useState, useEffect } from "react";
import BookingForm from "../../components/admin/BookingForm";
import {
  getBookings,
  createBooking,
  updateBookingStatus,
  deleteBookingById,
} from "../../middlewares/api.js";
import moment from "moment";
import AdminSidebar from "../../components/admin/Sidebar";
import { toast } from "react-hot-toast";
import { FiEdit, FiTrash2, FiCheck, FiPlus, FiSave } from "react-icons/fi";

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editingStatusId, setEditingStatusId] = useState(null);
  const [statusDraft, setStatusDraft] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await getBookings();
        setBookings(data.bookings || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      }
    };
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBookingById(id);
      setBookings(bookings.filter((booking) => booking._id !== id));
      toast.success("Booking deleted");
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking");
    }
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedBooking(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedBooking) {
        await updateBookingStatus(selectedBooking._id, formData.status);
        setBookings(
          bookings.map((booking) =>
            booking._id === selectedBooking._id
              ? { ...booking, ...formData }
              : booking
          )
        );
        toast.success("Booking updated");
      } else {
        const { data } = await createBooking(formData);
        setBookings((prevBookings) => [...prevBookings, data.booking]);
        toast.success("Booking created");
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to save booking");
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      setBookings(
        bookings.map((booking) =>
          booking._id === id ? { ...booking, status } : booking
        )
      );
      setEditingStatusId(null);
      toast.success("Status updated");
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.error("Failed to update status");
    }
  };

  const filteredBookings = bookings.filter((booking) =>
    booking?.customerName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex w-full">
        <div className="w-[20%] bg-gray-100 h-screen">
          <AdminSidebar />
        </div>
        <div className="p-6 w-[80%]">
          <div className="flex justify-between mb-4 w-full">
            <input
              type="text"
              placeholder="Search by customer name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-teal-500 text-white p-2 rounded flex items-center gap-2"
            >
              <FiPlus /> Add Booking
            </button>
          </div>

          <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Customer Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Service Type</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Time</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking._id} className="border-b">
                  <td className="py-3 px-6">{booking.customerName}</td>
                  <td className="py-3 px-6">{booking.email}</td>
                  <td className="py-3 px-6">{booking.address}</td>
                  <td className="py-3 px-6">{booking.serviceType}</td>
                  <td className="py-3 px-6">{booking.phone}</td>
                  <td className="py-3 px-6">
                    {moment(booking.date).format("MMMM D, YYYY")}
                  </td>
                  <td className="py-3 px-6">
                    {moment(booking.time, "HH:mm", true).isValid()
                      ? moment(booking.time, "HH:mm").format("hh:mm A")
                      : "Invalid time"}
                  </td>
                  <td className="py-3 px-6">{booking.ptice}</td>
                  <td className="py-3 px-6">
                    {editingStatusId === booking._id ? (
                      <select
                        value={statusDraft}
                        onChange={(e) => setStatusDraft(e.target.value)}
                        className="p-1 border rounded"
                      >
                        {["Pending", "Confirmed", "Completed", "Cancelled"].map(
                          (status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          )
                        )}
                      </select>
                    ) : (
                      booking.status
                    )}
                  </td>
                  <td className="py-3 px-6 flex gap-3 items-center">
                    {editingStatusId === booking._id ? (
                      <button
                        onClick={() =>
                          handleUpdateStatus(booking._id, statusDraft)
                        }
                        className="text-green-600 hover:text-green-700"
                        title="Save"
                      >
                        <FiSave />
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(booking)}
                          className="text-teal-600 hover:text-teal-700"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <FiTrash2 />
                        </button>
                        <button
                          onClick={() => {
                            setEditingStatusId(booking._id);
                            setStatusDraft(booking.status);
                          }}
                          className="text-gray-600 hover:text-gray-800"
                          title="Change Status"
                        >
                          <FiCheck />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isFormOpen && (
            <BookingForm
              booking={selectedBooking}
              onClose={handleCloseForm}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default BookingTable;
