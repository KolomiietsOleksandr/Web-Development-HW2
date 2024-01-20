const express = require('express');
const app = express();
const htmlHandler = require('./handlers/htmlHandler');
const fileHandler = require('./handlers/fileHandler');
const objectHandler = require('./handlers/objectHandler');

const port = 3000;

app.use((req, res, next) => {
    const whitelist = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (whitelist.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/html1', htmlHandler);
app.get('/html2', htmlHandler);
app.use('/file', fileHandler);
app.get('/objects/:type/:id', objectHandler);
app.get('/objects/:type', objectHandler);
app.get('/objects', objectHandler);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
