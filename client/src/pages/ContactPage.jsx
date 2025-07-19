import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import Navbar from "../components/Navbar";

function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-teal-600 mb-4">
                Send us a Message
              </h3>
              <form className="space-y-6">
                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    className="p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    className="p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold">Message</label>
                  <textarea
                    required
                    placeholder="Your message"
                    className="p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none h-32"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-teal-600 mb-4">
                Our Contact Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-lg text-gray-700">
                  <FiPhone className="text-teal-600" />
                  <span>(123) 456-7890</span>
                </div>
                <div className="flex items-center gap-3 text-lg text-gray-700">
                  <FiMail className="text-teal-600" />
                  <span>contact@cleanio.com</span>
                </div>
                <div className="flex items-center gap-3 text-lg text-gray-700">
                  <FiMapPin className="text-teal-600" />
                  <span>123 Cleanio St., City, Country</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
