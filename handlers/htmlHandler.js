const express = require('express');
const router = express.Router();

router.get('/html1', (req, res) => {
    res.send('This is HTML1');
});

router.get('/html2', (req, res) => {
    res.send('This is HTML2');
});

module.exports = router;
