import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  CircularProgress,
  TextField,
  Pagination
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { API_URL } from '../../config'
import AddToCartButton from './components/AddToCartButton';

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const StyledMedia = styled(CardMedia)({
  paddingTop: '56.25%', // 16:9
});

const PaginationContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 20,
});


export default function Catalog() {
  const [toys, setToys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchToys = async () => {
      try {
        const response = await fetch(API_URL + '/api/toys');
        const data = await response.json();
        setToys(data.toys);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching toys:', error);
        setLoading(false);
      }
    };

    fetchToys();
  }, []);

  const filteredToys = toys.filter(toy =>
    toy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    toy.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedToys = filteredToys.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) {
    return (
      <Container maxWidth="lg" style={{ textAlign: 'center', padding: 40 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" style={{ padding: 20 }}>
      <TextField
        fullWidth
        label="Поиск игрушек"
        variant="outlined"
        margin="normal"
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1);
        }}
      />

      <Grid container spacing={4}>
        {paginatedToys.map((toy) => (
          <Grid item key={toy.id} xs={12} sm={6} md={4} size={4}>
            <StyledCard>
              <StyledMedia
                image={toy.imageUrl != null ? `${API_URL}/${toy.imageUrl}` : '/default-toy.jpg'}
                title={toy.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {toy.name}
                </Typography>
                <Typography color="textSecondary">
                  Описание: {toy.description}
                </Typography>
                <Typography variant="body2" component="p">
                  Размер: {toy.height} × {toy.width} см
                </Typography>
              </CardContent>
              <CardActions>
                <AddToCartButton toy={toy} />
                <Typography variant="h6" style={{ marginLeft: 'auto' }}>
                  {toy.price} ₽
                </Typography>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      { totalPages != 0 ? (
        <PaginationContainer>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </PaginationContainer>
      ) : null}
    </Container>
  );
}