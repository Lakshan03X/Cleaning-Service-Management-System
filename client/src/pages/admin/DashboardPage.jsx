import { FiUsers, FiPackage, FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";
import Sidebar from "../../components/admin/Sidebar";
import { useState, useEffect } from "react";
import { getAllUsers, getServices, getBookings } from "../../middlewares/api";

const DashboardPage = () => {
  const [userCount, setUserCount] = useState(null);
  const [serviceCount, setServiceCount] = useState(null);
  const [pendingBookings, setPendingBookings] = useState(null);

  const fetchUsers = async () => {
    try {
      const { data } = await getAllUsers();
      setUserCount(data.users.length);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setUserCount(0);
    }
  };

  const fetchServices = async () => {
    try {
      const { data } = await getServices();
      setServiceCount(data.services.length);
    } catch (error) {
      console.error("Failed to fetch services:", error);
      setServiceCount(0);
    }
  };

  const fetchBookings = async () => {
    try {
      const { data } = await getBookings();
      setPendingBookings(data.bookings.length);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setPendingBookings(0);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchBookings();
    fetchServices();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-[20%] bg-gray-100 border-r border-gray-200 sticky top-0 h-screen">
        <Sidebar />
      </aside>
      <main className="flex-1 p-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold text-teal-600 mb-8">Dashboard</h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="bg-white shadow-md rounded-md p-6 flex items-center gap-4">
            <FiUsers className="text-teal-600 text-4xl" />
            <div>
              <h2 className="text-xl font-semibold">Total Users</h2>
              <p className="text-2xl font-bold">
                {userCount === null ? "Loading..." : userCount}
              </p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-md p-6 flex items-center gap-4">
            <FiPackage className="text-teal-600 text-4xl" />
            <div>
              <h2 className="text-xl font-semibold">Total Services</h2>
              <p className="text-2xl font-bold">
                {serviceCount === null ? "Loading..." : serviceCount}
              </p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-md p-6 flex items-center gap-4">
            <FiCalendar className="text-teal-600 text-4xl" />
            <div>
              <h2 className="text-xl font-semibold">Pending Bookings</h2>
              <p className="text-2xl font-bold">
                {pendingBookings === null ? "Loading..." : pendingBookings}
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardPage;
