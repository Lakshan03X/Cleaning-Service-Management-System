import { useEffect, useState } from "react";
import {
  FiHome,
  FiDroplet,
  FiRefreshCcw,
  FiLayers,
  FiBriefcase,
} from "react-icons/fi";
import { getServices } from "../middlewares/api"; // adjust path as needed
import { toast } from "react-hot-toast";

const ICON_MAP = {
  "deep cleaning": <FiHome className="text-teal-600" />,
  "carpet cleaning": <FiDroplet className="text-teal-600" />,
  "window cleaning": <FiRefreshCcw className="text-teal-600" />,
  "office cleaning": <FiBriefcase className="text-teal-600" />,
  "move-out cleaning": <FiLayers className="text-teal-600" />,
};

export default function ServiceList() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await getServices();
        setServices(data.services);
      } catch (err) {
        toast.error("Failed to load services.");
        console.error("Error loading services:", err);
      }
    };

    fetchServices();
  }, []);

  const getIcon = (serviceName) => {
    const key = serviceName?.toLowerCase()?.trim();
    return ICON_MAP[key] || <FiHome className="text-teal-600" />;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-b from-teal-100 to-teal-50 shadow-lg rounded-lg">
      <h2 className="text-4xl font-extrabold text-teal-600 mb-12 text-center">
        Our Premium Services & Prices
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(({ _id, serviceName, price, description }) => (
          <div
            key={_id}
            className="bg-white shadow-2xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-out hover:shadow-xl hover:rotate-1"
          >
            <div className="p-6 text-center">
              <div className="mb-6 text-5xl">{getIcon(serviceName)}</div>
              <h3 className="text-2xl font-semibold text-teal-600 tracking-wide">{serviceName}</h3>
              <p className="text-gray-700 mt-4 text-lg">{description}</p>
            </div>
            <div className="bg-teal-600 p-4 text-center transform transition duration-300 ease-in-out hover:bg-teal-700">
              <span className="text-white text-2xl font-bold">${price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
