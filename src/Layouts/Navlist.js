import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AppBar, Toolbar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import Header from './HeaderLayouts';
import {CssBaseline } from '@mui/material';

const drawerWidth = 240;

const NAVIGATION = [
    { title: 'Roles', icon: <DashboardIcon /> },
    { title: 'Orders', icon: <ShoppingCartIcon /> },
    { title: 'Reports', icon: <BarChartIcon /> },
    { title: 'Integrations', icon: <LayersIcon /> }
];

export default function Navlist({ children }) {
    const [open, setOpen] = React.useState(false);


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* Barra superior */}
            <AppBar position="fixed" sx={{ zIndex: 1201 }}>
                <Header />
            </AppBar>

            {/* Menú lateral */}
            <Drawer
                variant="permanent"
                sx={{ width: drawerWidth, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' } }}
            >
                <Toolbar />
                <List>
                    {NAVIGATION.map((item, index) => (
                        <ListItem button key={index}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Contenido */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px`, mt: '64px' }}>
                {children}
            </Box>
        </Box>
    );
}