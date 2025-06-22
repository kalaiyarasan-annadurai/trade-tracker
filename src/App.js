import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom';


import './App.css';
import FormFilling from './components/FormFilling';
import TradeList from './components/TradeList';
import Home from './components/Home';
import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import FormFilling from './pages/FormFilling';
// import Reports from './pages/Reports';


const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

const App = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
            <Navbar />
            <Routes>          
                <Route>
                <Route path="/" element={<Home />} />
                <Route path="/form" element={<FormFilling />} />
                <Route path="/reports" element={<TradeList />} />
                <Route path="/summary" element={<SummaryCards />} />


            </Route>
            </Routes>

        </Router>
    </ThemeProvider>
  );


export default App;