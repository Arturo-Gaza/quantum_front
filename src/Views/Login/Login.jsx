import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importar axios
import Footer from '../../components/Footer';
import {LOGIN_USER} from '../../Constants/ApiConstants'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Hacer la solicitud POST a la API
      const response = await axios.post(LOGIN_USER, {
        email,
        password,
      });

      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('idRol', response.data.data.idRol);

      // Si la respuesta es exitosa, guardar el token de autenticación
      if (response.data.token) {
        localStorage.setItem("auth", true); // Simula un inicio de sesión
        localStorage.setItem("token", response.data.token); // Guardar el token
        navigate("/dashboard");
      } else {
        setError("Credenciales incorrectas. Inténtalo de nuevo.");
      }
    } catch (error) {
      // Manejar errores de la solicitud
      setError("Error al iniciar sesión. Verifica tus credenciales.");
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ padding: "10px 20px" }}>
          Iniciar Sesión
        </button>
      </form>
      <Footer sx={{ mt: 5 }}/>
    </div>
  );
};

export default Login;