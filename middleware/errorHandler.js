// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
    console.error(err.stack);
    // Если ответ уже отправлен, передаем ошибку дальше (Express закроет соединение)
    if (res.headersSent) {
        return next(err);
    }
    // Определяем код ошибки (если явно задан, иначе 500)
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
};
