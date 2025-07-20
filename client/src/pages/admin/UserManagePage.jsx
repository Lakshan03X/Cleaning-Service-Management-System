import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  registerUser,
} from "../../middlewares/api";
import Sidebar from "../../components/admin/Sidebar";
import toast from "react-hot-toast";
import UserForm from "../../components/admin/UserForm";

function UserManagePage() {
  const [users, setUsers] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const { data } = await getAllUsers();
      setUsers(data.users);
    } catch (error) {
      toast.error("Failed to load users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    setSelectedUser(null);
    setFormOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormOpen(true);
  };

  const handleClose = () => {
    setSelectedUser(null);
    setFormOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      toast.success("User deleted.");
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch {
      toast.error("Delete failed.");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedUser) {
        const { data } = await updateUser(selectedUser._id, formData);
        setUsers((prev) =>
          prev.map((u) => (u._id === selectedUser._id ? data.user : u))
        );
        toast.success("User updated.");
      } else {
        await registerUser(formData);
        fetchUsers();
        toast.success("User added.");
      }
      handleClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Submit failed.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-[20%] bg-gray-100 border-r border-gray-200 sticky top-0 h-screen">
        <Sidebar />
      </aside>
      <main className="flex-1 p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-teal-600">User Management</h2>
          <button
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition"
          >
            Add User
          </button>
        </div>
        <div className="overflow-x-auto rounded-md shadow-md bg-white">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border-b border-gray-300 text-left">Name</th>
                <th className="p-3 border-b border-gray-300 text-left">Email</th>
                <th className="p-3 border-b border-gray-300 text-left">Phone</th>
                <th className="p-3 border-b border-gray-300 text-left">Address</th>
                <th className="p-3 border-b border-gray-300 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-teal-50 transition-colors"
                >
                  <td className="p-3">{user.fullName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3">{user.address}</td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md shadow-sm transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-6 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {formOpen && (
          <UserForm user={selectedUser} onClose={handleClose} onSubmit={handleSubmit} />
        )}
      </main>
    </div>
  );
}

export default UserManagePage;
