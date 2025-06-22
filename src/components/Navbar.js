import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Trade Tracker
      </Typography>
      <Button color="inherit" component={Link} to="/">Home</Button>
      <Button color="inherit" component={Link} to="/form">Form Filling</Button>
      <Button color="inherit" component={Link} to="/reports">Reports</Button>
      <Button color="inherit" component={Link} to="/summary">Summary</Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;
