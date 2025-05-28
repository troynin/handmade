import express from 'express';
import bodyParser  from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'

import toysRouter from './routes/toys.js'
import authRouter from './routes/auth.js';
import orderRouter from './routes/orders.js';
import db from './models/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Проверка подключение к базе данных
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection to PostgreSQL has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();


// Middleware
app.use(cors({
  origin: '*', // или перечисли конкретные если нужно
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

app.use('/api/order', orderRouter)
app.use('/api/toys', toysRouter);
app.use('/api/auth', authRouter);

app.use('/uploads', express.static('uploads'));

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
