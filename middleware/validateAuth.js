// middleware/validateAuth.js
module.exports = (req, res, next) => {
    const { email, password } = req.body;
    // Проверка наличия
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }
    // Проверка формата email (простейшая)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }
    // Проверка длины пароля
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }
    // Пример дополнительных проверок: наличие цифр/букв, совпадение пароля и подтверждения, и т.д.
    // Если всё ок, передаем управление дальше
    next();
};
