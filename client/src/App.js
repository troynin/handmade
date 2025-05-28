import React from 'react';
import { Routes, Route } from 'react-router';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';

import Catalog from './modules/Catalog';
import AdminPanel from './modules/AdminPanel';
import LoginPage from './modules/LoginPage';
import RegisterPage from './modules/RegisterPage';
import CartPage from './modules/Cart';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Header />
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </Container>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
