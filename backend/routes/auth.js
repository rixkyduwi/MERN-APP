const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send('User not found');
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');
        
        user.loginTimestamp = new Date();
        await user.save();
        
        const token = jwt.sign({ userId: user._id }, 'secretkey');
        res.json({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Logout
router.post('/logout', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        user.logoutTimestamp = new Date();
        await user.save();
        res.send('Logged out');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
