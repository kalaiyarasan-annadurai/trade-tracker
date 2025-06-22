import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const SummaryCards = () => {

    const [trades, setTrades] = useState([]);
    
      // Load data from localStorage
      useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('trades')) || [];
        setTrades(saved);
      }, []);

  const totalPnL = trades.reduce((sum, t) => {
    const buy = parseFloat(t.buyPrice || 0) * parseFloat(t.quantity || 0);
    const sell = parseFloat(t.sellPrice || 0) * parseFloat(t.quantity || 0);
    return sum + (sell - buy);
  }, 0);

  const totalHoldings = trades.filter(t => !t.sellDate).length;

  const totalPayIn = trades.reduce((sum, t) => sum + parseFloat(t.payIn || 0), 0);
  const totalPayOut = trades.reduce((sum, t) => sum + parseFloat(t.payOut || 0), 0);

  const cardData = [
    { title: '📊 Total P&L', value: `₹ ${totalPnL.toFixed(2)}` },
    { title: '📦 Holdings', value: totalHoldings },
    { title: '💰 Pay-in Total', value: `₹ ${totalPayIn.toFixed(2)}` },
    { title: '📤 Pay-out Total', value: `₹ ${totalPayOut.toFixed(2)}` },
  ];

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {cardData.map((card, idx) => (
        <Grid item xs={12} sm={6} md={3} key={idx}>
          <Card sx={{ backgroundColor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                {card.title}
              </Typography>
              <Typography variant="h6">
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryCards;
