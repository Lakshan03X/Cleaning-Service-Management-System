import { FiUsers, FiPackage, FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";
import Sidebar from "../../components/admin/Sidebar";
import { useState, useEffect } from "react";
import { getAllUsers, getServices, getBookings } from "../../middlewares/api"; // Add this

const DashboardPage = () => {
  const [userCount, setUserCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await getAllUsers();
      setUsers(data.users);
      setUserCount(data.users.length);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const { data } = await getServices();
      setServiceCount(data.services.length);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  };

  const fetchBokking = async () => {
    try {
      const { data } = await getBookings();
      setPendingBookings(data.bookings.length);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchBokking(); // Call fetchBookings to get the pending bookings count
    fetchServices();
  }, []);

  return (
    <>
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="flex-1 p-8">
          <h1 className="text-4xl font-semibold text-teal-600 mb-8">
            Dashboard
          </h1>

          {/* Overall Statistics */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Total Users */}
            <div className="bg-white shadow-md rounded-md p-6 flex items-center gap-4">
              <FiUsers className="text-teal-600 text-4xl" />
              <div>
                <h2 className="text-xl font-semibold">Total Users</h2>
                {/* If data is still loading, show a spinner */}
                <p className="text-2xl font-bold">
                  {userCount === 0 ? "Loading..." : userCount}
                </p>
              </div>
            </div>

            {/* Total Services */}
            <div className="bg-white shadow-md rounded-md p-6 flex items-center gap-4">
              <FiPackage className="text-teal-600 text-4xl" />
              <div>
                <h2 className="text-xl font-semibold">Total Services</h2>
                {/* If data is still loading, show a spinner */}
                <p className="text-2xl font-bold">
                  {serviceCount === 0 ? "Loading..." : serviceCount}
                </p>
              </div>
            </div>

            {/* Pending Bookings */}
            <div className="bg-white shadow-md rounded-md p-6 flex items-center gap-4">
              <FiCalendar className="text-teal-600 text-4xl" />
              <div>
                <h2 className="text-xl font-semibold">Pending Bookings</h2>
                {/* If data is still loading, show a spinner */}
                <p className="text-2xl font-bold">
                  {pendingBookings === 0 ? "0" : pendingBookings}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
