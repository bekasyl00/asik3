// middleware/upload.js
const multer = require('multer');
const path = require('path');

// Настраиваем хранилище файлов - сохраняем в папку uploads/, имя файла уникальное
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', 'uploads'));
    },
    filename: function (req, file, cb) {
        // Уникальное имя: добавим дату к оригинальному названию
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);  // сохраняем оригинальное расширение
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// Фильтр по типу файла – например, разрешить только картинки
function fileFilter (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
}

// Ограничение размера файла, например 5 МБ
const MAX_SIZE = 5 * 1024 * 1024;

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: MAX_SIZE } });
module.exports = upload;
