const express = require('express');
const path = require('path');
const router = express.Router();

const getFilePath = (type, filename) => {
    const baseDirectory = type === 'audio' ? 'assets/Audio' : 'assets/Images';
    return path.join(__dirname, `../${baseDirectory}`, filename);
};

router.get('/audio/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = getFilePath('audio', filename);
    res.sendFile(filePath);
});

router.get('/photo/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = getFilePath('photo', filename);
    res.sendFile(filePath);
});

module.exports = router;
