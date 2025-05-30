import React from 'react';
import { 
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
  Avatar,
} from '@mui/material';
import axios from 'axios'
import { useCart } from '../../hooks/Cart';
import { API_URL } from '../../config';
import { useAuth } from '../../context/AuthContext';

const CartPage = () => {
  const { authToken } = useAuth()
  const { list, removeFromCart, clearCart } = useCart();

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Авторизуйтесь для оформления заказа');
      return;
    }

    try {
      const response = await axios.post(
        API_URL + '/api/order/create',
        { items: list },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      alert('Заказ успешно оформлен!');
      clearCart();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || 'Ошибка при оформлении заказа');
    }
  };

  return (
    <Container maxWidth="lg" style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>Корзина</Typography>

      {list.length === 0 ? (
        <Typography>Корзина пуста</Typography>
      ) : (
        <>
          <List>
            {list.map(({ toy, quantity }) => (
              <ListItem key={toy.id}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    src={`${API_URL}/${toy.imageUrl}`}
                    alt={toy.name}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${toy.name} — ${toy.price} ₽`}
                  secondary={`Количество: ${quantity}`}
                />
                <Button onClick={() => removeFromCart(toy.id)}>Удалить</Button>
              </ListItem>
            ))}
          </List>

          <Button variant="outlined" onClick={clearCart} style={{ marginRight: 20 }}>Очистить корзину</Button>
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            Оформить заказ
          </Button>
        </>
      )}
    </Container>
  );
};

export default CartPage;
