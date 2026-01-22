# Assignment 3 - Auth + Profile

Полнофункциональное веб-приложение на Node.js + Express с регистрацией и входом.
Используются две базы данных:
- PostgreSQL: учетные записи (email + хэш пароля).
- MongoDB: профиль пользователя (имя, био, фото).

## Возможности
- POST /api/register
- POST /api/login
- GET /api/profile (только после входа)
- POST /api/profile (обновление профиля + фото)
- GET /api/logout

## Быстрый старт

1. Установите зависимости:

```bash
npm install
```

2. Создайте таблицу users в PostgreSQL:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(60) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. Создайте `.env` (пример):

```
PORT=3000
PG_URI=postgresql://user:password@localhost:5432/mydatabase
MONGO_URI=mongodb://localhost:27017/mydatabase
SESSION_SECRET=supersecretkey
```

4. Запуск:

```bash
npm start
```

Откройте `http://localhost:3000`.

## Структура проекта

```
project-root/
├── server.js
├── package.json
├── config/
│   ├── db.js
│   └── mongo.js
├── models/
│   ├── userModel.js
│   └── profileModel.js
├── controllers/
│   ├── authController.js
│   └── profileController.js
├── middleware/
│   ├── logger.js
│   ├── validateAuth.js
│   ├── authRequired.js
│   ├── upload.js
│   └── errorHandler.js
├── routes/
│   ├── authRoutes.js
│   └── profileRoutes.js
├── public/
│   ├── index.html
│   ├── register.html
│   ├── login.html
│   ├── profile.html
│   ├── app.js
│   ├── style.css
│   └── uploads/
└── README.md
```

## Примеры запросов

Регистрация:

```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"secret123"}'
```

Вход:

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"test@example.com","password":"secret123"}'
```

Получить профиль:

```bash
curl -X GET http://localhost:3000/api/profile -b cookies.txt
```

Обновить профиль + фото:

```bash
curl -X POST http://localhost:3000/api/profile -b cookies.txt \
  -F "name=Alice" -F "bio=Hello" -F "photo=@/path/to/file.png"
```
