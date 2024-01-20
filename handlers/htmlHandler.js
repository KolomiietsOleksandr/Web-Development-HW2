const express = require('express');
const path = require('path');
const router = express.Router();

const getHtmlContent = (filename) => {
    const filePath = path.join(__dirname, '../assets/Pages/', filename);
    const content = require('fs').readFileSync(filePath, 'utf-8');
    return content;
};

router.get('/html1', (req, res) => {
    const htmlContent = getHtmlContent('Page1.html');
    res.send(htmlContent);
});

router.get('/html2', (req, res) => {
    const htmlContent = getHtmlContent('Page2.html');
    res.send(htmlContent);
});

module.exports = router;
