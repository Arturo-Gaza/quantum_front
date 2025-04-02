import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AppBar, Toolbar , IconButton} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import Header from './HeaderLayouts';
import {CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const drawerWidth = 240;

const NAVIGATION = [
    { title: 'Roles', icon: <DashboardIcon />, path: '/roles' },
    { title: 'Usuarios', icon: <ShoppingCartIcon />, path: '/dashboard' },
    { title: 'Categorias', icon: <BarChartIcon />, path: '/categorias' },
    { title: 'Integrations', icon: <LayersIcon />, path: '/integrations' }
];

export default function Navlist({ children }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        {/* Barra superior con botón de menú */}
        <AppBar position="fixed" sx={{ zIndex: 1201 }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpen(true)}>
                    <MenuIcon />
                </IconButton>
                <Header />
            </Toolbar>
        </AppBar>

        {/* Drawer temporal */}
        <Drawer
            variant="temporary"
            open={open}
            onClose={() => setOpen(false)}
            sx={{ [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' } }}
        >
            <Toolbar />
            <List>
                {NAVIGATION.map((item, index) => (
                    <ListItem button key={index} onClick={() => { 
                        navigate(item.path);
                        setOpen(false); // Cierra el menú después de navegar
                    }}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItem>
                ))}
            </List>
        </Drawer>

        {/* Contenido principal */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: '64px' }}>
            {children}
        </Box>
    </Box>
);
}