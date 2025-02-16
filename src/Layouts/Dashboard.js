import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenido al Dashboard</h1>
      <button onClick={handleLogout} style={{ padding: "10px 20px" }}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Dashboard;
