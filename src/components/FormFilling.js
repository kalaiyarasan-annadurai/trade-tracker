import React from 'react';
import { Container, Typography } from '@mui/material';
import TradeForm from './TradeForm';

const FormFilling = () => {
  return (
    <Container sx={{ mt: 5 , backgroundColor: '#e9f5f0', py: 4}}>
      <Typography variant="h5" gutterBottom>
        📋 Enter Trade Details 
      </Typography>
      <TradeForm />
    </Container>
  );
};

export default FormFilling;
