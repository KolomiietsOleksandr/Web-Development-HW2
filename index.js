const express = require('express');
const fs = require('fs');
const app = express();
const htmlHandler = require('./handlers/htmlHandler');
const fileHandler = require('./handlers/fileHandler');
const objectHandler = require('./handlers/objectHandler');
const path = require('path');

const port = 3000;

app.use((req, res, next) => {
    const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
    const origin = req.headers.origin;
    if (whitelist.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => {
    res.send("Main page");
});

app.get('/html1', htmlHandler);
app.get('/html2', htmlHandler);
app.use('/file', fileHandler);
app.use('/objects', objectHandler);

app.get('/info', (req, res) => {
    const documentationPath = path.join(__dirname, 'assets/Info/', 'apiDocumentation.json');

    try {
        const documentationContent = fs.readFileSync(documentationPath, 'utf-8');
        const documentation = JSON.parse(documentationContent);
        res.json(documentation);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
