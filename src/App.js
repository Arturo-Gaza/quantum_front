import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Views/Login/Login";
import Dashboard from "./Views/Dashboard/Dashboard";
import Roles from "./Views/Catalogos/Roles";
import Categorias from "./Views/Catalogos/Categorias";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("auth");
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
         <Route
          path="/roles"
          element={
            <PrivateRoute>
              <Roles />
            </PrivateRoute>
          }
        />
         <Route
          path="/categorias"
          element={
            <PrivateRoute>
              <Categorias />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
