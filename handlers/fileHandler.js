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

    res.sendFile(filePath, (err) => {
        if (err) {
            handleFileError(err, res);
        }
    });
});

router.get('/photo/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = getFilePath('photo', filename);

    res.sendFile(filePath, (err) => {
        if (err) {
            handleFileError(err, res);
        }
    });
});

const handleFileError = (err, res) => {
    if (err.code === 'ENOENT') {
        res.status(404).send('File not found');
    } else {
        res.status(500).send('Internal Server Error');
    }
};

module.exports = router;
