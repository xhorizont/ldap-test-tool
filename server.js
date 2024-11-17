const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ldapService = require('./src/ldapService');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/test-connection', async (req, res) => {
    try {
        const result = await ldapService.testConnection(req.body);
        res.json({ success: true, message: 'Connection successful' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

app.post('/api/search-user', async (req, res) => {
    try {
        const userInfo = await ldapService.searchUser(req.body);
        res.json({ success: true, data: userInfo });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 