import {
    FiEdit,
    FiTrash2,
    FiUser,
    FiMapPin,
    FiCalendar,
    FiClock,
    FiLayers,
  } from "react-icons/fi";
  
  export default function MyBookings({ bookings, setBookings, setEditingIndex }) {
    const handleCancel = (idx) => {
      setBookings((b) => b.filter((_, i) => i !== idx));
    };
  
    return (
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-semibold text-teal-600 mb-6 text-center">
          Your Bookings
        </h2>
        {bookings.length === 0 ? (
          <p className="text-gray-600 text-center">No bookings yet.</p>
        ) : (
          <ul className="space-y-6">
            {bookings.map((b, i) => (
              <li
                key={i}
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
                    <FiCalendar className="text-teal-600 text-xl" /> {b.date}
                  </p>
                  <p className="flex items-center gap-3 text-lg">
                    <FiClock className="text-teal-600 text-xl" /> {b.time}
                  </p>
                  <p className="flex items-center gap-3 text-lg">
                    <FiLayers className="text-teal-600 text-xl" /> {b.serviceType}
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
                    onClick={() => handleCancel(i)}
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
  