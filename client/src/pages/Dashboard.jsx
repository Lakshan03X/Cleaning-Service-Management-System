// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => {
        setUser(null);
        window.location.replace("/"); // use replace to prevent back-button login
      });
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/logout", {
        method: "GET",
        credentials: "include", // VERY IMPORTANT
      });

      if (res.ok) {
        setUser(null);
        window.location.replace("/");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>
        <strong>Name:</strong> {user.fullName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
