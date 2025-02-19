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
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import '../../Styles/EstilosGenerales.css';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import { Typography } from "@mui/material";

// Define el tema fuera del componente
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Color primario
    },
    secondary: {
      main: '#dc004e', // Color secundario
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

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
    <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh', border: 2 }}>
        <HeaderLayout sx={{ mt: 5 }} />
        <Grid container component={Paper} elevation={6} square sx={{ border: 2 }}>

        <Grid item xs={12} sm={6} md={6} sx={{ border: 2 }}>
              <Box
                sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <h2>{user.NombreInst}</h2>
              </Box>
              <Box
                style={{ paddingTop: '3%' }}
                sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={6} style={{ paddingTop: '5%' }} sx={{ border: 2 }}>
            <Box
                sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                  <LockOutlinedIcon sx={{ color: '#ffffff' }} />
                </Avatar>
                <Typography component="h1" variant="h6">
                  Iniciar sesión
                </Typography>
                <Box component="form" noValidate  sx={{ mt: 1 }}>
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

                <Grid className='margin2' sx={{ border: 2 }}>
                    <center>
                      
                <button type="submit" style={{ padding: '10px 20px' }}>
                  Iniciar Sesión
                </button>
                    </center>
                  </Grid>
                </Box>
                
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} sx={{ border: 2 }} >
              <Box
                sx={{ my: 3, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <Footer sx={{ mt: 5 }} />
              </Box>
            </Grid>
        </Grid>
        </Grid>
    </ThemeProvider>
  );
};

export default Login;