// server.js
const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

// Подключение к БД
require('./config/db');
require('./config/mongo');

const app = express();

// Middleware для парсинга JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Сессии (для управления пользователями)
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false }
}));

// Логирование запросов
const logger = require('./middleware/logger');
app.use(logger);

// Подключение маршрутов
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
app.use('/api', authRoutes);
app.use('/api', profileRoutes);

// Раздача статических файлов (HTML, CSS, изображения)
app.use(express.static(path.join(__dirname, 'public')));

// Централизованный обработчик ошибок (должен идти последним)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
