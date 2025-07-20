import { useEffect, useState } from "react";
import AddBooking from "../components/AddBooking";
import MyBookings from "../components/MyBooking";
import ServiceList from "../components/ServiceList";
import Navbar from "../components/Navbar";

export default function ServicesPage() {
  const [tab, setTab] = useState("add");
  const [bookings, setBookings] = useState([1]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
    console.log("Email from localStorage:", savedEmail);
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-teal-50 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <nav className="flex justify-center gap-4 mb-10">
            {[
              { id: "add", label: "Book Service" },
              { id: "my", label: "My Bookings" },
              { id: "services", label: "Services & Prices" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => {
                  setTab(id);
                  if (id !== "my") setEditingIndex(null);
                }}
                className={`px-6 py-3 font-semibold rounded-md transition ${
                  tab === id
                    ? "bg-teal-600 text-white shadow-lg"
                    : "bg-white text-teal-600 hover:bg-teal-100"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <section>
            {tab === "add" && (
              <AddBooking
                bookings={bookings}
                setBookings={setBookings}
                editingIndex={editingIndex}
                setEditingIndex={setEditingIndex}
                userEmail={email}
              />
            )}
            {tab === "my" && (
              <MyBookings
                bookings={bookings}
                setBookings={setBookings}
                setEditingIndex={setEditingIndex}
                userEmail={email} 
              />
            )}
            {tab === "services" && <ServiceList />}
          </section>
        </div>
      </div>
    </>
  );
}
