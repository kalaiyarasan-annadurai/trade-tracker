import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Alert,
  MenuItem,
  Paper,
} from '@mui/material';

const TradeForm = () => {
  const [form, setForm] = useState({
    buyDate: '',
    buySession: '',
    stockName: '',
    quantity: '',
    buyPrice: '',
    sellPrice: '',
    sellDate: '',
    sellingSession: '',
    segment: '',
    tradeType: '',
    entryCondition: '',
    exitCondition: '',
    brokrageAndTax: '',
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

  useEffect(() => {
    const { buyPrice, sellPrice, quantity } = form;
    if (buyPrice && sellPrice && quantity) {
      const profit = (parseFloat(sellPrice) - parseFloat(buyPrice)) * parseFloat(quantity);
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

  const validate = () => {
    const newErrors = {};

    ['stockName'].forEach(field => {
      if (!form[field]?.trim()) {
        newErrors[field] = 'Required';
      }
    });

    ['quantity', 'buyPrice'].forEach(field => {
      if (!form[field]) {
        newErrors[field] = 'Required';
      } else if (isNaN(Number(form[field]))) {
        newErrors[field] = 'Must be a number';
      }
    });

    ['buyDate'].forEach(field => {
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
        buyDate: '',
        buySession: '',
        stockName: '',
        quantity: '',
        buyPrice: '',
        sellPrice: '',
        sellDate: '',
        sellingSession: '',
        segment: '',
        tradeType: '',
        entryCondition: '',
        exitCondition: '',
        brokrageAndTax: '',
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

  const dropdownOptions = {
    buySession: ['Morning', 'Mid', 'Afternoon'],
    sellingSession: ['Morning', 'Mid', 'Afternoon'],
    segment: ['Equity', 'Future', 'Option', 'Commodity', 'Currency'],
    tradeType: ['Intra-day', 'Investment', 'Swing', 'Scalping'],
    entryCondition: ['Accurate Entry', 'Early Entry', 'Entry Without Condition', 'Random', 'Good', 'Late Entry', 'Revenge'],
    exitCondition: ['Accurate Exit', 'Early Exit', 'Exit in Fear', 'Target Hit', 'SL Hit'],
  };

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
  };

  const fieldSections = {
    'Buy Details': ['stockName', 'quantity', 'buyDate', 'buySession', 'segment', 'tradeType', 'entryCondition', 'buyPrice'],
    'Sell Details': ['sellPrice', 'sellDate', 'sellingSession', 'exitCondition', 'brokrageAndTax'],
    'Additional Details': ['openingBalance', 'closingBalance', 'payIn', 'payOut', 'commission', 'remarks'],
  };

  return (
    <Container maxWidth="md" sx={{ backgroundColor: '#f9f9f9', padding: 4, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Trade Entry Form</Typography>
      {submitted && <Alert severity="success">Trade saved successfully!</Alert>}
      <form onSubmit={handleSubmit}>
        {Object.entries(fieldSections).map(([section, fields]) => (
          <Paper elevation={1} sx={{ p: 2, mb: 2 }} key={section}>
            <Typography variant="h6" gutterBottom>{section}</Typography>
            <Grid container spacing={2}>
              {fields.map((field, idx) => (
                <Grid item xs={12} sm={6} md = {4} key={idx}>
                  {dropdownOptions[field] ? (
                    <TextField
                      select
                      fullWidth
                      name={field}
                      label={labelMap[field] || field}
                      value={form[field]}
                      onChange={handleChange}
                      error={Boolean(errors[field])}
                      helperText={errors[field] || ''}
                      sx={{ minWidth: '100%' }} // ensure full container width

                    >
                      {dropdownOptions[field].map((option, i) => (
                        <MenuItem value={option} key={i}>{option}</MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <TextField
                      fullWidth
                      name={field}
                      label={labelMap[field] || field}
                      type={
                        field.toLowerCase().includes('date')
                          ? 'date'
                          : ['quantity', 'buyPrice', 'sellPrice'].includes(field)
                          ? 'number'
                          : 'text'
                      }
                      value={form[field]}
                      onChange={handleChange}
                      InputLabelProps={field.toLowerCase().includes('date') ? { shrink: true } : {}}
                      error={Boolean(errors[field])}
                      helperText={errors[field] || ''}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
          </Paper>
        ))}

        {form.profit && (
          <TextField
            fullWidth
            label="Profit"
            value={form.profit}
            InputProps={{ readOnly: true }}
            sx={{ mb: 2 }}
          />
        )}

        <Button type="submit" variant="contained" color="primary">
          Submit Trade
        </Button>
      </form>
    </Container>
  );
};

export default TradeForm;
