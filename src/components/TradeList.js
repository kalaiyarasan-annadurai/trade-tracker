import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'Sl. No', width: 80 },
  { field: 'buyDate', headerName: 'Buy Date', width: 110 },
  { field: 'stockName', headerName: 'Stock Name', width: 150 },
  { field: 'quantity', headerName: 'Quantity', width: 100 },
  { field: 'buyPrice', headerName: 'Buying Price', width: 120 },
  { field: 'sellPrice', headerName: 'Selling Price', width: 120 },
  { field: 'sellDate', headerName: 'Selling Date', width: 110 },
  { field: 'openingBalance', headerName: 'Opening Balance', width: 140 },
  { field: 'closingBalance', headerName: 'Closing Balance', width: 140 },
  { field: 'payIn', headerName: 'Pay-in', width: 100 },
  { field: 'payOut', headerName: 'Pay-out', width: 100 },
  { field: 'profit', headerName: 'Profit', width: 100 },
  { field: 'commission', headerName: 'Commission', width: 110 },
  { field: 'remarks', headerName: 'Remarks', width: 150 },
];

const TradeList = () => {

    const [trades, setTrades] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('trades')) || [];
    setTrades(saved);
  }, []);
  const rows = trades.map((trade, index) => ({
    id: index + 1,
    ...trade
  }));

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>Trade Entries</Typography>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </div>
    </Container>
  );
};

export default TradeList;
