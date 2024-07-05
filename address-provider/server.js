// File: address-provider/server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const os = require('os');

const app = express();
const PORT = 4000;

function getLocalIPAddress() {
    const interfaces = os.networkInterfaces();
    for (const ifaceName in interfaces) {
        const iface = interfaces[ifaceName];
        for (const alias of iface) {
            if (alias.family === 'IPv4' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return '127.0.0.1';
}

const HOST = getLocalIPAddress();

app.use(cors());
app.use(express.json());

let backendAddress = null;

app.post('/register-backend', (req, res) => {
    const { ip, port } = req.body;
    backendAddress = `http://${ip}:${port}`;
    // console.log('Backend registered:', backendAddress);
    res.json({ 
        message: 'Backend address registered successfully',
        addressProviderInfo: {
            ip: HOST,
            port: PORT
        }
    });
});

app.post('/get-backend-address', (req, res) => {
    const { passcode } = req.body;
    if (passcode !== '9062002') {
        return res.status(401).json({ error: 'Invalid passcode' });
    }
    if (!backendAddress) {
        return res.status(404).json({ error: 'Backend address not registered' });
    }
    res.json({ address: backendAddress });
});

app.listen(PORT, HOST, () => {
    console.log(`Address provider running on http://${HOST}:${PORT}`);
});