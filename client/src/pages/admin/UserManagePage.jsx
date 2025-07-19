import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import AdminSidebar from "../../components/admin/Sidebar";

const UserManagementPage = ({ users, setUsers }) => {
  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <>
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <h1 className="text-4xl font-semibold text-teal-600 mb-8">
            User Management
          </h1>
          <button className="bg-teal-600 text-white px-6 py-3 rounded-md flex items-center gap-2 mb-6">
            <FiPlus /> Add New User
          </button>
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {users.map((user) => (
              <tr key={user.id} className="border-b">
              <td className="py-3 px-6">{user.name}</td>
              <td className="py-3 px-6">{user.email}</td>
              <td className="py-3 px-6">{user.role}</td>
              <td className="py-3 px-6 flex gap-3">
              <button className="text-teal-600 hover:text-teal-700">
              <FiEdit />
              </button>
              <button
              className="text-red-600 hover:text-red-700"
              onClick={() => handleDelete(user.id)}
              >
              <FiTrash2 />
              </button>
              </td>
              </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserManagementPage;
