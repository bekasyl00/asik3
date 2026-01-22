// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authRequired = require('../middleware/authRequired');
const upload = require('../middleware/upload');

// Все маршруты профиля требуют авторизации
router.use(authRequired);

router.get('/profile', profileController.getProfile);
// При обновлении профиля используем multer для обработки файла (поле "photo")
router.post('/profile', upload.single('photo'), profileController.updateProfile);

module.exports = router;
