import React from "react";
import Navbar from "../components/Navbar";

function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">

          <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h3 className="text-3xl font-semibold text-teal-600 mb-6">
              Our Mission
            </h3>
            <p className="text-lg text-gray-700">
              Cleanio is dedicated to providing top-notch cleaning services
              tailored to our clients' needs. Our mission is to create a
              cleaner, healthier, and more comfortable environment for both
              residential and commercial spaces.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h3 className="text-3xl font-semibold text-teal-600 mb-6">
              Our Vision
            </h3>
            <p className="text-lg text-gray-700">
              To become the most trusted and reliable cleaning service provider
              in the industry by consistently delivering exceptional service,
              unmatched quality, and a commitment to sustainability.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h3 className="text-3xl font-semibold text-teal-600 mb-6">
              Our Values
            </h3>
            <ul className="space-y-4 text-lg text-gray-700">
              <li>
                <strong>Integrity:</strong> We operate with transparency and
                honesty in all our business dealings.
              </li>
              <li>
                <strong>Customer Satisfaction:</strong> Our clients are our top
                priority, and we aim to exceed their expectations.
              </li>
              <li>
                <strong>Sustainability:</strong> We are committed to
                eco-friendly practices to reduce our carbon footprint.
              </li>
              <li>
                <strong>Excellence:</strong> We strive for the highest standards
                in every service we provide.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
