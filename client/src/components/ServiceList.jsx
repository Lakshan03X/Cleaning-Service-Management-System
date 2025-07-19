import { FiCheckCircle, FiHome, FiDroplet, FiLayers, FiRefreshCcw, FiBriefcase } from 'react-icons/fi'

export default function ServiceList() {
  const services = [
    {
      name: 'Deep Cleaning',
      price: 120,
      desc: 'Thorough cleaning including hard-to-reach areas',
      icon: <FiHome className="text-teal-600" />,
    },
    {
      name: 'Carpet Cleaning',
      price: 80,
      desc: 'Deep carpet wash and stain removal',
      icon: <FiDroplet className="text-teal-600" />,
    },
    {
      name: 'Window Cleaning',
      price: 60,
      desc: 'Sparkling clean windows inside & out',
      icon: <FiRefreshCcw className="text-teal-600" />,
    },
    {
      name: 'Office Cleaning',
      price: 150,
      desc: 'Professional cleaning tailored for offices',
      icon: <FiBriefcase className="text-teal-600" />,
    },
    {
      name: 'Move-out Cleaning',
      price: 200,
      desc: 'Complete cleaning for moving out',
      icon: <FiLayers className="text-teal-600" />,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-b from-teal-100 to-teal-50 shadow-lg rounded-lg">
      <h2 className="text-4xl font-extrabold text-teal-600 mb-12 text-center">
        Our Premium Services & Prices
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(({ name, price, desc, icon }) => (
          <div
            key={name}
            className="bg-white shadow-2xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-out hover:shadow-xl hover:rotate-1"
          >
            <div className="p-6 text-center">
              <div className="mb-6 text-5xl">{icon}</div>
              <h3 className="text-2xl font-semibold text-teal-600 tracking-wide">{name}</h3>
              <p className="text-gray-700 mt-4 text-lg">{desc}</p>
            </div>
            <div className="bg-teal-600 p-4 text-center transform transition duration-300 ease-in-out hover:bg-teal-700">
              <span className="text-white text-2xl font-bold">${price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
