import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import models from '../models/index.js'
import { authMiddleware } from '../middleware/auth.js';

const Toy = models.Toy

const router = Router();
// Указываем папку для сохранения и имя файла
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // папка uploads в корне проекта (создай её заранее)
  },
  filename: function (req, file, cb) {
    // Чтобы избежать конфликтов, добавим временную метку к имени файла
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Сохраняем с оригинальным расширением
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Получение игрушек с пагинацией
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 6 } = req.query;
    const offset = (page - 1) * limit;
    
    const { count, rows } = await Toy.findAndCountAll({
      limit,
      offset
    });
    
    res.json({
      toys: rows,
      totalPages: Math.ceil(count / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получение конкретной игрушки
router.get('/:id', async (req, res) => {
  try {
    const toy = await Toy.findByPk(req.params.id);
    if (toy) {
      res.json(toy);
    } else {
      res.status(404).json({ error: 'Toy not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Создание новой игрушки
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const toyData = {
      ...req.body,
      imageUrl: req.file ? req.file.path : null,
    }
    const toy = await Toy.create(toyData);
    res.status(201).json(toy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Обновление игрушки
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const toyData = {
      ...req.body,
      imageUrl: req.file ? req.file.path: null,
    }
    const [updated] = await Toy.update(toyData, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedToy = await Toy.findByPk(req.params.id);
      res.json(updatedToy);
    } else {
      res.status(404).json({ error: 'Toy not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Удаление игрушки
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Toy.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Toy not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;