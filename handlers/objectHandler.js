const express = require('express');
const router = express.Router();

router.get('/objects/:type/:id', (req, res) => {
    const type = req.params.type;
    const id = req.params.id;

    res.send(`Object with type ${type} and ID ${id}`);
});

router.get('/objects/:type', (req, res) => {
    const type = req.params.type;
    res.send(`Objects with type ${type}`);
});

router.get('/objects', (req, res) => {
    res.send('All objects');
});

module.exports = router;
