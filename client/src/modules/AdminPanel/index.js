import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Paper,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import ToyForm from './components/ToyForm';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function AdminPanel() {
  const [toys, setToys] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentToy, setCurrentToy] = useState(null);
  const { authToken } = useAuth();

  const fetchToys = async () => {
    const res = await axios.get('http://localhost:5000/api/toys');
    setToys(res.data.toys);
  };

  useEffect(() => { fetchToys(); }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/toys/${id}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    fetchToys();
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4">Управление каталогом</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => {
            setCurrentToy(null);
            setOpen(true);
          }}
        >
          Добавить игрушку
        </Button>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell>Высота</TableCell>
              <TableCell>Ширина</TableCell>
              <TableCell>Вес</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {toys.map((toy) => (
              <TableRow key={toy.id}>
                <TableCell>{toy.name}</TableCell>
                <TableCell size="small">{toy.description}</TableCell>
                <TableCell>{toy.height}</TableCell>
                <TableCell>{toy.width}</TableCell>
                <TableCell>{toy.weight}</TableCell>
                <TableCell sx={{ width: "100px" }}>{toy.price} ₽</TableCell>
                <TableCell sx={{ width: "150px" }}>
                  <IconButton onClick={() => {
                    setCurrentToy(toy);
                    setOpen(true);
                  }}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(toy.id)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {currentToy ? 'Редактирование' : 'Новая игрушка'}
        </DialogTitle>
        <DialogContent>
          <ToyForm 
            toy={currentToy} 
            onSuccess={() => {
              setOpen(false);
              fetchToys();
            }} 
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}