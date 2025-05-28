import express from 'express';
import jwt from 'jsonwebtoken';
import models from '../models/index.js'
import { authMiddleware } from '../middleware/auth.js';
const router = express.Router();

const User = models.User

// Регистрация
router.post('/register', async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.create({ name, password, role: 'user' });
    res.status(201).json({
      message: 'Пользователь создан',
      user: { id: user.id, name: user.name, role: user},
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Авторизация
router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ where: { name } });
    if (!user){
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    const isPasswordValid = password === user.password;
    if (!isPasswordValid){
      return res.status(401).json({ error: 'Неверный пароль' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Проверка авторизованности (доступен только с токеном)
router.get('/me', authMiddleware, (req, res) => {
  res.json(req.user);
});

export default router;