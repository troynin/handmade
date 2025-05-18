import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

const users = [
  { id: 1, email: 'admin@example.com', password: 'admin123', name: 'Администратор' }
];

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Неверные учетные данные' });
  }

  const token = jwt.sign(
    { userId: user.id }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1h' }
  );

  res.json({ token });
});

router.get('/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = users.find(u => u.id === decoded.userId);
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: 'Недействительный токен' });
  }
});

export default router;