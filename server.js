const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// File upload configuration
const upload = multer({ 
    dest: 'uploads/',
    limits: { fileSize: 100 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        cb(path.extname(file.originalname).toLowerCase() === '.gcode' ? 
            null : new Error('Only .gcode files allowed'));
    }
});

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
!fs.existsSync(uploadDir) && fs.mkdirSync(uploadDir, { recursive: true });

// In-memory storage
let uploadHistory = [];
let deviceConfigs = { bluetooth: null, wifi: null };

// Load configs from file
const configFile = path.join(__dirname, 'config.json');
if (fs.existsSync(configFile)) {
    try {
        Object.assign(deviceConfigs, JSON.parse(fs.readFileSync(configFile, 'utf8')));
    } catch (e) { console.error('Error loading configs:', e); }
}

// Save configs to file
const saveConfigs = () => {
    try { fs.writeFileSync(configFile, JSON.stringify(deviceConfigs, null, 2)); }
    catch (e) { console.error('Error saving configs:', e); }
};

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/bluetooth', (req, res) => res.sendFile(path.join(__dirname, 'public', 'bluetooth.html')));
app.get('/wifi', (req, res) => res.sendFile(path.join(__dirname, 'public', 'wifi.html')));

// File upload
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file' });
        
        const fileInfo = {
            filename: req.file.originalname,
            path: req.file.path,
            size: req.file.size,
            uploadDate: new Date().toISOString()
        };
        
        uploadHistory = [fileInfo, ...uploadHistory].slice(0, 10);
        res.json({ message: 'File uploaded', file: fileInfo });
    } catch (e) {
        console.error('Upload error:', e);
        res.status(500).json({ error: 'Upload failed' });
    }
});

// Get history
app.get('/api/history', (req, res) => {
    try { res.json(uploadHistory); }
    catch (e) { res.status(500).json({ error: 'History error' }); }
});

// Device config
app.route('/api/device/config')
    .get((req, res) => {
        try { res.json(deviceConfigs); }
        catch (e) { res.status(500).json({ error: 'Config error' }); }
    })
    .post((req, res) => {
        try {
            const { type, data } = req.body;
            if (!type || !data || !['bluetooth', 'wifi'].includes(type)) {
                return res.status(400).json({ error: 'Invalid request' });
            }
            deviceConfigs[type] = data;
            saveConfigs();
            res.json({ message: 'Config saved', [type]: data });
        } catch (e) {
            console.error('Config error:', e);
            res.status(500).json({ error: 'Config update failed' });
        }
    });

// Serve static files
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: err.message || 'Error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`- Home: http://localhost:${PORT}`);
    console.log(`- Bluetooth: http://localhost:${PORT}/bluetooth`);
    console.log(`- WiFi: http://localhost:${PORT}/wifi`);
});