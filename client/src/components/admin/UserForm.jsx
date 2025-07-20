import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const UserForm = ({ user, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    gender: "Male",
    role: "User",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
        password: "",
        gender: user.gender || "Male",
        role: user.role || "User",
      });
    } else {
      setFormData({
        fullName: "",
        email: "",
        address: "",
        phone: "",
        password: "",
        gender: "Male",
        role: "User",
      });
    }
  }, [user]);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required.";
    if (!formData.email.trim()) errs.email = "Email is required.";
    if ((!user || changePassword) && formData.password.length < 8)
      errs.password = "Password must be at least 8 characters.";
    if (formData.phone && !/^\d{10}$/.test(formData.phone))
      errs.phone = "Phone number must be 10 digits.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const dataToSubmit = { ...formData };
      if (!user || changePassword) {
        onSubmit(dataToSubmit);
      } else {
        delete dataToSubmit.password; // Don't submit empty password
        onSubmit(dataToSubmit);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start z-50">
      <div className="bg-white w-full max-w-md h-screen overflow-y-auto p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-xl font-bold mb-4">
          {user ? "Edit" : "Add"} User
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1">Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Password section */}
          {!user && (
            <div className="mb-4 relative">
              <label className="block mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded pr-10"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
              {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>
          )}

          {user && !changePassword && (
            <div className="mb-4">
              <button
                type="button"
                onClick={() => setChangePassword(true)}
                className="text-blue-600 underline text-sm"
              >
                Change Password
              </button>
            </div>
          )}

          {user && changePassword && (
            <div className="mb-4 relative">
              <label className="block mb-1">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded pr-10"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
              {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              {user ? "Update" : "Add"} User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
