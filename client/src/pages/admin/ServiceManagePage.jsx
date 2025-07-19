import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import AdminSidebar from "../../components/admin/Sidebar";

const ServiceManagementPage = ({ services, setServices }) => {
  const handleDelete = (id) => {
    setServices((prevServices) =>
      prevServices.filter((service) => service.id !== id)
    );
  };

  return (
    <>
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <h1 className="text-4xl font-semibold text-teal-600 mb-8">
            Service Management
          </h1>
          <button className="bg-teal-600 text-white px-6 py-3 rounded-md flex items-center gap-2 mb-6">
            <FiPlus /> Add New Service
          </button>
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="py-3 px-6">Service Name</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Description</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {services.map((service) => (
            <tr key={service.id} className="border-b">
              <td className="py-3 px-6">{service.name}</td>
              <td className="py-3 px-6">${service.price}</td>
              <td className="py-3 px-6">{service.description}</td>
              <td className="py-3 px-6 flex gap-3">
                <button className="text-teal-600 hover:text-teal-700">
                  <FiEdit />
                </button>
                <button
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(service.id)}
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

export default ServiceManagementPage;
