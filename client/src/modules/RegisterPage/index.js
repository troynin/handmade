import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, TextField, Button, Typography, Box, MenuItem, Alert } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../../config';

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    password: '',
    role: 'user'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post(API_URL + '/api/auth/register', form);
      setSuccess(response.data.message);
      setForm({ name: '', password: '', role: 'user' });
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка регистрации');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Регистрация
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Имя"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Пароль"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth>
            Зарегистрироваться
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
