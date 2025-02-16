import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Footer from '../../Layouts/Footer';
import { LOGIN_USER } from '../../Constants/ApiConstants'
import HeaderLayout from "../../Layouts/HeaderLayouts";
import { getBaseUrl } from "../../components/AxiosCalls/AxiosCallsLocal";
import requests from "../../components/AxiosCalls/AxiosCallsLocal";
import axios from "axios"; // Importar axios
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import '../../Styles/EstilosGenerales.css'

const Login = () => {
  const [user, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [messageSnackBar, setMessageSnackBar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = {
        user,
        password,
      };

      const baseUrl = await getBaseUrl(); // Obtener la URL base correctamente
      const response = await axios.post(`${baseUrl}/${LOGIN_USER}`, data);

      // Verificar si la respuesta contiene el token y los datos necesarios
      if (response.data && response.data.token && response.data.data) {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('idRol', response.data.data.idRol);
        sessionStorage.setItem('idUsuario', response.data.data.id);
        sessionStorage.setItem('user', response.data.data.user);
        sessionStorage.setItem('nombre', `${response.data.data.name} ${response.data.data.apellidoP || ''} ${response.data.data.apellidoM || ''}`);
        sessionStorage.setItem('nameRol', response.data.data.nombre);

        localStorage.setItem("auth", true);
        localStorage.setItem("token", response.data.token);

        setMessageSnackBar({
          open: true,
          message: response.data.message || "login exitoso mensaje mio",
          severity: "success" // O "info", dependiendo del diseño de tu Snackbar
        });

        navigate("/dashboard"); // Redirigir al usuario al dashboard
      } else {
        setError("Credenciales incorrectas. Inténtalo de nuevo.");
      }

    } catch (error) {
      // Manejo de errores más detallado
      const errorMessage = error.response?.data?.message || "Error al iniciar sesión. Verifica tus credenciales.";
      setError(errorMessage);
      console.error("Error al iniciar sesión:", error);
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (

    <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '100vh' }}>
      <HeaderLayout />
      <div style={{ flexGrow: 1 }}>
        <h2>Inicio de Sesión</h2>
        
          <Grid container spacing={2}
            sx={{
              justifyContent: "flex-end",
              alignItems: "center",
            }}>
            <Box>
              <form onSubmit={handleLogin} className="login">
                <div style={{ marginBottom: '15px' }}>
                  <label>Usuario:</label>
                  <input
                    type="text"
                    value={user}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: '75%', padding: '10px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label>Contraseña:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: '75%', padding: '10px' }}
                  />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" style={{ padding: '10px 20px' }}>
                  Iniciar Sesión
                </button>
              </form>
            </Box>

          </Grid>
      </div>
      <Footer sx={{ mt: 5 }} />
    </div>
  );
};

export default Login;