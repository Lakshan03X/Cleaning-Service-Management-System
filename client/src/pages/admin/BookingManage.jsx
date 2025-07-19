import { FiEdit, FiTrash2, FiCheck, FiPlus } from "react-icons/fi";
import AdminSidebar from "../../components/admin/Sidebar";

const BookingManagementPage = ({ bookings, setBookings }) => {
  const handleDelete = (id) => {
    setBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== id)
    );
  };

  const handleAssign = (id) => {
    // Logic for assigning the booking to a cleaner
  };

  return (
    <>
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <h1 className="text-4xl font-semibold text-teal-600 mb-8">
            Booking Management
          </h1>
          <button className="bg-teal-600 text-white px-6 py-3 rounded-md flex items-center gap-2 mb-6">
            <FiPlus /> Add New Booking
          </button>
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="py-3 px-6">Customer Name</th>
                <th className="py-3 px-6">Service</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {bookings.map((booking) => (
            <tr key={booking.id} className="border-b">
              <td className="py-3 px-6">{booking.customerName}</td>
              <td className="py-3 px-6">{booking.service}</td>
              <td className="py-3 px-6">{booking.status}</td>
              <td className="py-3 px-6 flex gap-3">
                <button
                  className="text-teal-600 hover:text-teal-700"
                  onClick={() => handleAssign(booking.id)}
                >
                  <FiCheck />
                </button>
                <button className="text-teal-600 hover:text-teal-700">
                  <FiEdit />
                </button>
                <button
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(booking.id)}
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BookingManagementPage;
