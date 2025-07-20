import React, { useState, useEffect } from "react";
import ServiceForm from "../../components/admin/ServiceForm";
import { getServices, createService, updateService, deleteServiceById } from "../../middlewares/api";
import { toast } from "react-hot-toast";

const ServiceTable = () => {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Fetch services on mount
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
          prev.map((s) => (s._id === selectedService._id ? data.updatedService : s))
        );
        toast.success("Service updated successfully");
      } else {
        const { data } = await createService(formData);
        // fetch latest data from backend again
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by service name"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-green-500 text-white p-2 rounded"
        >
          Add Service
        </button>
      </div>

      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border-b">Service Name</th>
            <th className="p-2 border-b">Description</th>
            <th className="p-2 border-b">Price</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map((service) => (
            <tr key={service._id}>
              <td className="p-2 border-b">{service.serviceName}</td>
              <td className="p-2 border-b">{service.description}</td>
              <td className="p-2 border-b">${service.price}</td>
              <td className="p-2 border-b">
                <button
                  onClick={() => handleEdit(service)}
                  className="bg-yellow-500 text-white p-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isFormOpen && (
        <ServiceForm
          service={selectedService}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ServiceTable;
