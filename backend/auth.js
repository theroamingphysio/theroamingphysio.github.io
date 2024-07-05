const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// Mock user for demonstration
const mockUser = {
    username: 'testuser',
    passwordHash: bcrypt.hashSync('testpassword', 10), // Hash the password for storage
};

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    if (username !== mockUser.username) {
        return res.status(401).json({ message: 'Invalid username' });
    }

    const isPasswordValid = await bcrypt.compare(password, mockUser.passwordHash);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ username: mockUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
