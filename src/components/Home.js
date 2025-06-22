import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container sx={{ mt: 5 , backgroundColor: '#e9f5f0', py: 4}}>
      <Typography variant="h4" gutterBottom>
        Welcome to Trade Tracker 📈
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Track your daily stock transactions and monitor your profits easily.
      </Typography>
      <Box display="flex" gap={2}>
        <Button variant="contained" component={Link} to="/form">
          Add Trade
        </Button>
        <Button variant="outlined" component={Link} to="/reports">
          View Reports
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
