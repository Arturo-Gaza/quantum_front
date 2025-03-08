// src/Layouts/Header.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Grid2 } from '@mui/material';
import Box from '@mui/material/Box';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
};


  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
      
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
        <Toolbar>
          <Typography variant="h6" noWrap onClick={handleLogout} style={{ padding: "10px 20px" }}>
            Quantum
          </Typography>
          </Toolbar>
        </Box>
    </AppBar>


  );
};

export default Header;
