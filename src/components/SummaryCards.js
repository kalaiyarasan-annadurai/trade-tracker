import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Container, Box } from '@mui/material';

const SummaryCards = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('trades')) || [];
    setTrades(saved);
  }, [setTrades]);

  const totalPnL = trades.reduce((sum, t) => {
    const buy = parseFloat(t.buyPrice || 0) * parseFloat(t.quantity || 0);
    const sell = parseFloat(t.sellPrice || 0) * parseFloat(t.quantity || 0);
    return sum + (sell - buy);
  }, 0);

  const totalHoldings = trades.filter(t => !t.sellDate || t.sellDate.trim() === '').length;

  const totalPayIn = trades.reduce((sum, t) => sum + parseFloat(t.payIn || 0), 0);
  const totalPayOut = trades.reduce((sum, t) => sum + parseFloat(t.payOut || 0), 0);

  const cardData = [
    { title: '📊 Total P&L', value: `₹ ${totalPnL.toFixed(2)}`, color: totalPnL < 0 ? 'red' : 'green' },
    { title: '📦 Holdings', value: totalHoldings },
    { title: '💰 Pay-in Total', value: `₹ ${totalPayIn.toFixed(2)}` },
    { title: '📤 Pay-out Total', value: `₹ ${totalPayOut.toFixed(2)}` },
  ];

  return (
    <Box sx={{ backgroundColor: '#e9f5f0', py: 4 }}>
      <Container>
        <Typography variant="h5" align="center" gutterBottom>
          📈 Trade Summary
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {cardData.map((card, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card
                sx={{
                  backgroundColor: '#ffffff',
                  boxShadow: 2,
                  borderRadius: 2,
                  height: '100%',
                }}
              >
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary">
                    {card.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 1,
                      fontWeight: 600,
                      color: card.color || 'text.primary',
                    }}
                  >
                    {card.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SummaryCards;
