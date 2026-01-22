// controllers/profileController.js
const Profile = require('../models/profileModel');
const UserModel = require('../models/userModel');

exports.getProfile = async (req, res, next) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        const profile = await Profile.findOne({ userId: userId });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        const user = await UserModel.findById(userId);
        const payload = profile.toObject();
        if (!payload.name && payload.username) {
            payload.name = payload.username;
        }
        if (user && user.email) {
            payload.email = user.email;
        }
        return res.json({ profile: payload });
    } catch (err) {
        next(err);
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        const { name, bio } = req.body;
        const updatedData = { name, bio };
        if (name) {
            updatedData.username = name;
        }
        if (req.file) {
            updatedData.photoPath = '/uploads/' + req.file.filename;
        }
        const result = await Profile.findOneAndUpdate(
            { userId: userId },
            { $set: updatedData },
            { new: true }
        );
        if (!result) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        const user = await UserModel.findById(userId);
        const payload = result.toObject();
        if (!payload.name && payload.username) {
            payload.name = payload.username;
        }
        if (user && user.email) {
            payload.email = user.email;
        }
        return res.json({ message: 'Profile updated successfully', profile: payload });
    } catch (err) {
        next(err);
    }
};
