import React, { useState, useEffect } from "react";
import ServiceForm from "../../components/admin/ServiceForm";
import Sidebar from "../../components/admin/Sidebar";
import {
  getServices,
  createService,
  updateService,
  deleteServiceById,
} from "../../middlewares/api";
import { toast } from "react-hot-toast";

const ServiceTable = () => {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await getServices();
        setServices(data.services);
      } catch (err) {
        toast.error("Failed to fetch services.");
        console.error(err);
      }
    };

    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteServiceById(id);
      setServices((prev) => prev.filter((s) => s._id !== id));
      toast.success("Service deleted");
    } catch (err) {
      toast.error("Failed to delete service");
      console.error(err);
    }
  };

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const handleEdit = (service) => {
    setSelectedService(service);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedService(null);
    setIsFormOpen(false);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedService) {
        const { data } = await updateService(selectedService._id, formData);
        setServices((prev) =>
          prev.map((s) =>
            s._id === selectedService._id ? data.updatedService : s
          )
        );
        toast.success("Service updated successfully");
      } else {
        await createService(formData);
        const refreshed = await getServices();
        setServices(refreshed.data.services);
        toast.success("Service created successfully");
      }
      handleCloseForm();
    } catch (err) {
      const message = err?.response?.data?.message || "Submission failed";
      toast.error(message);
      console.error(err);
    }
  };

  const filteredServices = services.filter((s) =>
    s.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-[20%] bg-gray-100 border-r border-gray-200 sticky top-0 h-screen">
        <Sidebar />
      </aside>
      <main className="flex-1 p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search by service name"
            value={searchQuery}
            onChange={handleSearch}
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-80"
          />
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition"
          >
            Add Service
          </button>
        </div>

        <table className="min-w-full table-auto bg-white rounded-md shadow-md overflow-hidden">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-3 border-b border-green-700 text-left">Service Name</th>
              <th className="p-3 border-b border-green-700 text-left">Description</th>
              <th className="p-3 border-b border-green-700 text-left">Price</th>
              <th className="p-3 border-b border-green-700 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((service) => (
              <tr
                key={service._id}
                className="border-b hover:bg-green-50 transition-colors"
              >
                <td className="p-3">{service.serviceName}</td>
                <td className="p-3">{service.description}</td>
                <td className="p-3">${service.price}</td>
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => handleEdit(service)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md shadow-sm transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow-sm transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredServices.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-6 text-gray-500">
                  No services found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {isFormOpen && (
          <ServiceForm
            service={selectedService}
            onClose={handleCloseForm}
            onSubmit={handleSubmit}
          />
        )}
      </main>
    </div>
  );
};

export default ServiceTable;
