import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  registerUser,
} from "../../middlewares/api";
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
        fetchUsers(); // reload to get new user with ID
        toast.success("User added.");
      }
      handleClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Submit failed.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>
      <table className="min-w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Address</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="p-2 border">{user.fullName}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.phone}</td>
              <td className="p-2 border">{user.address}</td>
              <td className="p-2 border flex gap-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {formOpen && (
        <UserForm
          user={selectedUser}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default UserManagePage;
