// config/db.js
const { Pool } = require('pg');
require('dotenv').config();  // загружаем .env

const pool = new Pool({
    connectionString: process.env.PG_URI,
    // можно указать дополнительные параметры, напр. pool size
});
pool.on('error', (err) => {
    console.error('Unexpected PG client error', err);
    // Логируем, но не падаем — ошибки соединения обработаются в запросах
});

module.exports = pool;
