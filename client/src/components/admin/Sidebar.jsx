import { Link } from "react-router-dom";
import { FiHome, FiUsers, FiPackage, FiCalendar, FiLogOut, FiUser } from "react-icons/fi";

const AdminSidebar = ({ adminName }) => {
  return (
    <div className="h-screen bg-teal-600 text-white p-6 flex flex-col">
      {/* Admin Panel Title */}
      <div className="text-3xl font-extrabold mb-12">Admin Panel</div>

      {/* Profile Section */}
      <div className="flex items-center gap-3 mb-8">
        <FiUser className="text-2xl" />
        <div className="text-lg font-semibold">Admin{adminName}</div>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-6">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3 hover:bg-teal-700 p-2 rounded-md"
        >
          <FiHome className="text-xl" />
          Dashboard
        </Link>
        <Link
          to="/admin/users"
          className="flex items-center gap-3 hover:bg-teal-700 p-2 rounded-md"
        >
          <FiUsers className="text-xl" />
          User Management
        </Link>
        <Link
          to="/admin/services"
          className="flex items-center gap-3 hover:bg-teal-700 p-2 rounded-md"
        >
          <FiPackage className="text-xl" />
          Service Management
        </Link>
        <Link
          to="/admin/bookings"
          className="flex items-center gap-3 hover:bg-teal-700 p-2 rounded-md"
        >
          <FiCalendar className="text-xl" />
          Booking Management
        </Link>
        <button className="flex items-center gap-3 hover:bg-teal-700 p-2 rounded-md mt-auto">
          <FiLogOut className="text-xl" />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
