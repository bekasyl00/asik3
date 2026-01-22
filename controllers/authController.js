// controllers/authController.js
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const Profile = require('../models/profileModel');

const SALT_ROUNDS = 10;

exports.register = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }

    const existing = await UserModel.findByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'Пользователь с таким email уже существует' });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await UserModel.createUser(email, passwordHash);

    // создаём профиль с именем
    await Profile.create({
      userId: newUser.id,
      name: username || '',
      username: username || '',
    });

    req.session.userId = newUser.id;

    return res.status(201).json({
      message: 'Регистрация прошла успешно',
      user: { id: newUser.id, email: newUser.email }
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email и пароль обязательны' });
    }

    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    req.session.userId = user.id;

    return res.json({ message: 'Вход выполнен успешно' });
  } catch (err) {
    next(err);
  }
};
