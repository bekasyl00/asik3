// models/userModel.js
const db = require('../config/db');

// Найти пользователя по email
async function findByEmail(email) {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

// Найти пользователя по ID
async function findById(id) {
  const result = await db.query('SELECT id, email, username FROM users WHERE id = $1', [id]);
  return result.rows[0];
}

// Создать нового пользователя с username
async function createUser(email, passwordHash, username) {
  const result = await db.query(
    'INSERT INTO users(email, password_hash, username) VALUES($1, $2, $3) RETURNING id, email, username',
    [email, passwordHash, username]
  );
  return result.rows[0];
}

module.exports = {
  findByEmail,
  findById,
  createUser
};
