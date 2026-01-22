// models/profileModel.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: { type: Number, required: true, unique: true }, // привязка к id из Postgres
    name: { type: String, default: '' },
    bio: { type: String, default: '' },
    photoPath: { type: String, default: '' },
    username: { type: String, default: '' },

    // можно добавить и другие поля профиля по необходимости
});
  


module.exports = mongoose.model('Profile', profileSchema);
