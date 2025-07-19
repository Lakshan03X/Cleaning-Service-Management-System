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

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000); // Timeout for 5 seconds

    return () => clearTimeout(timeoutId); // Clean up the timeout when component unmounts
  }, []);

  if (loading) {
    return <LoadingSpinner />; // Show spinner until timeout reaches
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/users" element={<UserManagementPage />} />
        <Route path="/admin/services" element={<ServiceManagementPage />} />
        <Route path="/admin/bookings" element={<BookingManagementPage />} />
      </Routes>
    </Router>
  );
}

export default App;
