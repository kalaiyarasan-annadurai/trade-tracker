import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const labelMap = {
  buyDate: 'Buy Date',
  buySession: 'Buy Session',
  stockName: 'Stock Name',
  quantity: 'Quantity',
  buyPrice: 'Buying Price',
  sellPrice: 'Selling Price',
  sellDate: 'Selling Date',
  sellingSession: 'Selling Session',
  segment: 'Segment',
  tradeType: 'Trade Type',
  entryCondition: 'Entry Condition',
  exitCondition: 'Exit Condition',
  brokrageAndTax: 'Brokerage & Tax',
  openingBalance: 'Opening Balance',
  closingBalance: 'Closing Balance',
  payIn: 'Pay-in',
  payOut: 'Pay-out',
  commission: 'Commission',
  remarks: 'Remarks',
  profit: 'Profit',
};

const columnsBase = Object.entries(labelMap).map(([key, label]) => {
  if (key === 'profit') {
    return {
      field: key,
      headerName: label,
      width: 120,
      renderCell: (params) => (
        <span
          style={{
            color: parseFloat(params.value) < 0 ? 'red' : 'green',
            fontWeight: 'bold',
          }}
        >
          {params.value}
        </span>
      ),
    };
  }
  return {
    field: key,
    headerName: label,
    width: 140,
  };
});

const TradeList = () => {
  const [trades, setTrades] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('trades')) || [];
    setTrades(saved);
  }, [setTrades]);

  const handleDelete = (index) => {
    const updatedTrades = trades.filter((_, i) => i !== index);
    setTrades(updatedTrades);
    localStorage.setItem('trades', JSON.stringify(updatedTrades));
  };

  const handleEditOpen = (index) => {
    setEditIndex(index);
    setEditData(trades[index]);
    setOpen(true);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    const updatedTrades = [...trades];
    updatedTrades[editIndex] = editData;
    setTrades(updatedTrades);
    localStorage.setItem('trades', JSON.stringify(updatedTrades));
    setOpen(false);
  };

  const columns = [
    { field: 'id', headerName: 'Sl. No', width: 80 },
    ...columnsBase,
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditOpen(params.row.id - 1)}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id - 1)}>
            <DeleteIcon color="error" />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = trades.map((trade, index) => ({
    id: index + 1,
    ...trade,
  }));

  return (
    <Container sx={{ mt: 4 , backgroundColor: '#e9f5f0', py: 4}}>
      <Typography variant="h6" gutterBottom>
        Trade Entries
      </Typography>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Edit Trade Entry</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {Object.entries(editData).map(([key, value], idx) =>
              key !== 'id' ? (
                <Grid item xs={12} sm={6} key={idx}>
                  <TextField
                    fullWidth
                    name={key}
                    label={labelMap[key] || key}
                    value={value || ''}
                    onChange={handleEditChange}
                    type={
                      key.toLowerCase().includes('date')
                        ? 'date'
                        : ['quantity', 'buyPrice', 'sellPrice'].includes(key)
                        ? 'number'
                        : 'text'
                    }
                    InputLabelProps={
                      key.toLowerCase().includes('date') ? { shrink: true } : {}
                    }
                  />
                </Grid>
              ) : null
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TradeList;


