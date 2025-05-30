import express from 'express';
import models from '../models/index.js'
import { authMiddleware } from '../middleware/auth.js';
const router = express.Router();

const Order = models.Order
const User = models.User
const Toy = models.Toy


// Проверка авторизованности (доступен только с токеном)
router.post('/create', authMiddleware, async (req, res) => {
  const user = req.user;
  const items = req.body.items

  const promises = items.map((item) => {
    const toy = item.toy;
    const quantity = item.quantity;
    const totalPrice = Number(toy.price) * Number(quantity);
    return Order.create({
      userId: user.id,
      toyId: toy.id,
      quantity,
      totalPrice: isNaN(totalPrice) ? 0 : totalPrice
    });
  })

  const result = Promise.all(promises)

  res.json(result)
});

router.get('/list', authMiddleware, async (req, res) => {
  const orders = await Order.findAll({
    include: [
      { model: User, attributes: ['id', 'name', 'email' ] },
      { model: Toy, attributes: ['id', 'name'] }
    ],
    order: [['createdAt', 'DESC']]
  });

  res.json({ orders });
});

export default router;