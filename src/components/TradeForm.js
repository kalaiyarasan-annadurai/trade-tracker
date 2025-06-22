import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Alert,
} from '@mui/material';

const TradeForm = () => {
  const [form, setForm] = useState({
    slNo: '',
    buyDate: '',
    stockName: '',
    quantity: '',
    buyPrice: '',
    sellPrice: '',
    sellDate: '',
    openingBalance: '',
    closingBalance: '',
    payIn: '',
    payOut: '',
    commission: '',
    remarks: '',
    profit: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Auto-calculate profit
  useEffect(() => {
    const { buyPrice, sellPrice, quantity } = form;
    if (buyPrice && sellPrice && quantity) {
      const profit =
        (parseFloat(sellPrice) - parseFloat(buyPrice)) *
        parseFloat(quantity);
      setForm(prev => ({ ...prev, profit: profit.toFixed(2) }));
    } else {
      setForm(prev => ({ ...prev, profit: '' }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.buyPrice, form.sellPrice, form.quantity]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const  validate = () => {
    const newErrors = {};

    // Required text
    ['slNo', 'stockName'].forEach(field => {
      if (!form[field]?.trim()) {
        newErrors[field] = 'Required';
      }
    });

    // Required numbers
    [
      'quantity',
      'buyPrice',
      'sellPrice',
      'openingBalance',
      'closingBalance',
      'payIn',
      'payOut',
      'commission',
    ].forEach(field => {
      if (!form[field]) {
        newErrors[field] = 'Required';
      } else if (isNaN(Number(form[field]))) {
        newErrors[field] = 'Must be a number';
      }
    });

    // Required dates
    ['buyDate', 'sellDate'].forEach(field => {
      if (!form[field]) {
        newErrors[field] = 'Required';
      }
    });

    return newErrors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const trades = JSON.parse(localStorage.getItem('trades') || '[]');
      const updatedTrades = [...trades, { ...form, createdAt: new Date().toISOString() }];
      localStorage.setItem('trades', JSON.stringify(updatedTrades));
      setSubmitted(true);
      setForm({
        slNo: '',
        buyDate: '',
        stockName: '',
        quantity: '',
        buyPrice: '',
        sellPrice: '',
        sellDate: '',
        openingBalance: '',
        closingBalance: '',
        payIn: '',
        payOut: '',
        commission: '',
        remarks: '',
        profit: '',
      });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const fields = [
    'slNo', 'buyDate', 'stockName', 'quantity',
    'buyPrice', 'sellPrice', 'sellDate', 'openingBalance',
    'closingBalance', 'payIn', 'payOut', 'commission', 'remarks'
  ];

  const labelMap = {
    slNo: 'Sl. No',
    buyDate: 'Buy Date',
    stockName: 'Stock Name',
    quantity: 'Quantity',
    buyPrice: 'Buying Price',
    sellPrice: 'Selling Price',
    sellDate: 'Selling Date',
    openingBalance: 'Opening Balance',
    closingBalance: 'Closing Balance',
    payIn: 'Pay-in',
    payOut: 'Pay-out',
    commission: 'Commission',
    remarks: 'Remarks',
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>Trade Entry Form</Typography>
      {submitted && <Alert severity="success">Trade saved successfully!</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {fields.map((field, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <TextField
                fullWidth
                name={field}
                label={labelMap[field]}
                type={field.toLowerCase().includes('date') ? 'date' : 'text'}
                value={form[field]}
                onChange={handleChange}
                InputLabelProps={field.toLowerCase().includes('date') ? { shrink: true } : {}}
                error={Boolean(errors[field])}
                helperText={errors[field] || ''}
              />
            </Grid>
          ))}

          {form.profit && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Profit"
                value={form.profit}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default TradeForm;
