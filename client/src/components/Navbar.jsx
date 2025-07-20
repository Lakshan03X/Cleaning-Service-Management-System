import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import ProfileAvatar from "../components/auth/ProfileAvatar"; // Make sure this path is correct
import ProfileModal from "../components/auth/ProfileModel";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setLoggedIn(true);
      } catch (error) {
        console.error("Invalid user data in localStorage:", error);
        localStorage.removeItem("user"); // Clean up corrupted data
        setUser(null);
        setLoggedIn(false);
      }
    } else {
      setUser(null);
      setLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedIn(false);
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-3xl font-semibold text-teal-600 tracking-tight"
          >
            CleanIo
          </Link>

          <nav className="hidden md:flex gap-10 text-gray-700 text-[17px] font-medium">
            <Link to="/" className="hover:text-teal-600 transition">
              Home
            </Link>
            <Link to="/services" className="hover:text-teal-600 transition">
              Services
            </Link>
            <Link to="/about" className="hover:text-teal-600 transition">
              About
            </Link>
            <Link to="/contact" className="hover:text-teal-600 transition">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-6">
            {!loggedIn ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-teal-600">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-700"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full overflow-hidden focus:ring-2 ring-teal-500"
                >
                  <ProfileAvatar user={user} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                    <Link
                      onClick={() => {
                        setShowProfileModal(true);
                        setDropdownOpen(false);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {menuOpen ? (
                <FiX className="text-2xl" />
              ) : (
                <FiMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-6 space-y-4 text-[17px] font-medium text-gray-700">
            <Link to="/" className="block hover:text-teal-600 transition">
              Home
            </Link>
            <Link
              to="/services"
              className="block hover:text-teal-600 transition"
            >
              Services
            </Link>
            <Link to="/about" className="block hover:text-teal-600 transition">
              About
            </Link>
            <Link
              to="/contact"
              className="block hover:text-teal-600 transition"
            >
              Contact
            </Link>
            {!loggedIn ? (
              <div className="flex flex-col gap-3 pt-4">
                <Link to="/login" className="text-gray-700 hover:text-teal-600">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:text-teal-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </header>
      {showProfileModal && (
        <ProfileModal user={user} onClose={() => setShowProfileModal(false)} />
      )}
    </>
  );
}
