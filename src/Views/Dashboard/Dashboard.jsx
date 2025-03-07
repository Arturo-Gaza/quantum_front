import React from "react";
import { useNavigate } from "react-router-dom";
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import HeaderLayout from "../../Layouts/HeaderLayouts";
import Footer from "../../Layouts/Footer";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Grid2 } from "@mui/material";

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

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth");
        navigate("/");
    };

    return (
        <ThemeProvider theme={theme}>
            <HeaderLayout sx={{ mt: 5 }} />
            <Grid2 container component="main" sx={{ height: '94vh' }}
                style={{ paddingTop: '1%', marginTop: '-2%', marginLeft: '1%' }}>
                {/*Panel central */}
                <Grid2 container component={Paper} elevation={6}
                    square sx={{
                        width: '99%',
                        height: '83%',
                    }}
                    style={{ paddingTop: '10%', marginTop: '2%' }}  >
                    <div style={{ textAlign: "center", marginTop: "50px", border: "2px" }}>
                        <h1>Bienvenido a la pagina de inicio</h1>
                        <button onClick={handleLogout} style={{ padding: "10px 20px" }}>
                            Cerrar Sesión
                        </button>
                    </div>
                </Grid2>
                <Grid2>
                </Grid2>
                {/*Panel footer */}
                <Grid2 item xs={12} sm={12} md={12} sx={{ margin: '0 auto',}} >
                    <Box
                        sx={{ my: 3, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        <Footer sx={{ mt: 5 }} />
                    </Box>
                </Grid2>
            </Grid2>


        </ThemeProvider>

    );
};

export default Dashboard;