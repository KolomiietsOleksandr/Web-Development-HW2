const express = require('express');
const router = express.Router();

router.get('/file/:filename', (req, res) => {
    const filename = req.params.filename;
    res.download(`/path/to/files/${filename}`);
});

module.exports = router;
