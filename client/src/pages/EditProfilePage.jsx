import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { getUserById, updateUser } from "../middlewares/api";

export default function EditProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    gender: "Male",
  });
  const [loading, setLoading] = useState(true);

  // Load user data
  useEffect(() => {
    getUserById(id)
      .then((res) => {
        if (res.data.success) {
          const user = res.data.user;
          setFormData({
            fullName: user.fullName || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
            gender: user.gender || "Male",
          });
        } else {
          toast.error("User not found");
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load user data");
        setLoading(false);
      });
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation (you can add more)
    if (!formData.fullName || !formData.phone || !formData.address) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const res = await updateUser(id, formData);
      if (res.data.success) {
        toast.success("Profile updated successfully!");
        // After update, redirect or update local state
        navigate("/"); // or wherever you want
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Email (read-only)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
