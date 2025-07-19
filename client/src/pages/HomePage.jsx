import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import Image from "../assets/background.jpeg"

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex flex-col">
        {/* Main Section */}
        <motion.section
          className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl font-extrabold text-teal-700 leading-tight mb-6">
              Manage Your Cleaning Services <br /> Seamlessly with CleanIo
            </h1>
            <p className="text-gray-700 text-lg max-w-xl mb-8">
              Simplify scheduling, track your jobs, and grow your cleaning
              business effortlessly — all in one place.
            </p>
            <div className="flex justify-center md:justify-start gap-6">
              <Link
                to="/signup"
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-md text-lg font-semibold transition"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="text-teal-600 hover:text-teal-700 text-lg font-semibold transition flex items-center gap-1"
              >
                Learn More →
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <motion.img
              src={Image}
              alt="Cleaning service"
              className="rounded-lg shadow-lg mx-auto w-full max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="bg-white py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-3xl font-semibold text-teal-600 mb-3">
                Schedule Easily
              </h3>
              <p className="text-gray-600 max-w-sm mx-auto">
                Book and manage cleaning appointments in a few clicks.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-3xl font-semibold text-teal-600 mb-3">
                Track Progress
              </h3>
              <p className="text-gray-600 max-w-sm mx-auto">
                Stay updated with job statuses and team performance.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <h3 className="text-3xl font-semibold text-teal-600 mb-3">
                Grow Business
              </h3>
              <p className="text-gray-600 max-w-sm mx-auto">
                Use insights and reports to expand your service reach.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section
          className="bg-teal-600 text-white py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-extrabold mb-6">
              Ready to transform your cleaning business?
            </h2>
            <Link
              to="/signup"
              className="inline-block bg-white text-teal-600 px-10 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition"
            >
              Start Your Free Trial
            </Link>
          </div>
        </motion.section>
      </main>
    </>
  );
}
