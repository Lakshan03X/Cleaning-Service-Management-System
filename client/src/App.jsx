import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import DashboardPage from "./pages/admin/DashboardPage";
import UserManagementPage from "./pages/admin/UserManagePage";
import ServiceManagementPage from "./pages/admin/ServiceManagePage";
import BookingManagementPage from "./pages/admin/BookingManage";
import LoadingSpinner from "./loader";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import EditProfilePage from "./pages/EditProfilePage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000); // Spinner shows for 3 seconds

    return () => clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      {/* ✅ Toast notifications are placed outside Routes */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            border: "1px solid #61d345",
            padding: "20px",
          },
        }}
        reverseOrder={false}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/edit/:id" element={<EditProfilePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/users" element={<UserManagementPage />} />
        <Route path="/admin/services" element={<ServiceManagementPage />} />
        <Route path="/admin/bookings" element={<BookingManagementPage />} />
      </Routes>
    </Router>
  );
}

export default App;
