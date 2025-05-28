import React, { useMemo } from 'react';
import { useNavigate } from 'react-router'
import { Button } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';
import { useCart } from '../../../../hooks/Cart';

const AddToCartButton = ({ toy }) => {
  const { authToken } = useAuth()
  const cart = useCart()

  const navigate = useNavigate()

  const isIncluded = useMemo(() => {
    return cart.list.find(item => item.toy.id === toy.id) != null
  }, [cart.list])

  console.log(isIncluded)

  const click = async () => {
    if (!authToken) {
      navigate('/login')
      return
    }

    if (!isIncluded) {
      cart.addToCart(toy)
    } else {
      cart.removeFromCart(toy.id)
    }
  };

  return (
    <Button 
      variant="outlined"
      color="primary"
      onClick={click}
      size="small"
    >
      {isIncluded ? 'Удалить из корзины' : 'Добавить в корзину'}
    </Button>
  );
};

export default AddToCartButton;
