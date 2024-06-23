const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./auth'); // Import auth routes
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', authRoutes); // Use auth routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        res.json({ imageUrl: `/uploads/${req.file.filename}` });
    } else {
        res.status(400).json({ error: 'No file uploaded' });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received login attempt:', username, password);

    try {
        const authResult = await authenticate(username, password);

        if (authResult.success) {
            res.json({ message: authResult.message, token: authResult.token });
        } else {
            res.status(401).json({ message: authResult.message });
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
const IP_ADDRESS = process.env.IP_ADDRESS || '0.0.0.0';
app.listen(PORT,IP_ADDRESS, () => {
    console.log(`Server running on http://${IP_ADDRESS}:${PORT}`)
});
