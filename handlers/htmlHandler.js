const express = require('express');
const path = require('path');
const router = express.Router();

const getHtmlContent = (filename) => {
    const filePath = path.join(__dirname, '../assets/Pages/', filename);

    try {
        const content = require('fs').readFileSync(filePath, 'utf-8');
        return content;
    } catch (error) {
        return null;
    }
};

router.get('/html1', (req, res) => {
    const htmlContent = getHtmlContent('Page1.html');

    if (htmlContent !== null) {
        res.send(htmlContent);
    } else {
        handleHtmlError(res);
    }
});

router.get('/html2', (req, res) => {
    const htmlContent = getHtmlContent('Page2.html');

    if (htmlContent !== null) {
        res.send(htmlContent);
    } else {
        handleHtmlError(res);
    }
});

const handleHtmlError = (res) => {
    res.status(500).send('Internal Server Error');
};

module.exports = router;
