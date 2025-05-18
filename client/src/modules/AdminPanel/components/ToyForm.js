import React, { useState, useEffect } from 'react';
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

export default function ToyForm({ toy, onSuccess }) {
  const { authToken } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    width: '',
    height: '',
    weight: '',
    price: '',
    description: '',
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (toy) setFormData(toy);
  }, [toy]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
    
    if (image) {
      formDataToSend.append('image', image);
    }

    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data'
        }
      };
      
      if (toy) {
        await axios.put(`http://localhost:5000/api/toys/${toy.id}`, formDataToSend, config);
      } else {
        await axios.post('http://localhost:5000/api/toys', formDataToSend, config);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving toy:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ pt: 2 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Название"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Высота"
            name="height"
            type="number"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Ширина"
            name="width"
            type="number"
            value={formData.width}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Вес"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Опиание"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Цена (₽)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            id="upload-image"
            hidden
          />
          <label htmlFor="upload-image">
            <Button variant="outlined" component="span">
              Загрузить изображение
            </Button>
          </label>
          {image && <Typography>{image.name}</Typography>}
        </Grid>

        
        <Grid item xs={12}>
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth
            size="large"
          >
            Сохранить
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}