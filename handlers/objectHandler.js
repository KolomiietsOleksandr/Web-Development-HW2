const express = require('express');
const path = require('path');
const router = express.Router();

const getJsonContent = (filename) => {
    const filePath = path.join(__dirname, `../data/${filename}.json`);
    const content = require(filePath);
    return content;
};

const generateHtmlForObject = (object) => `
    <h3>${object.name}</h3>
    <p>ID: ${object.id}</p>
    <p>Color: ${object.color}</p>
    <p>${object.quack ? 'Quack: ' + object.quack : ''}</p>
    <p>${object.honk ? 'Honk: ' + object.honk : ''}</p>
    <p>${object.cluck ? 'Cluck: ' + object.cluck : ''}</p>
`;

const generateHtmlForType = (type, jsonData) => `
    <h3>${type}</h3>
    ${jsonData.map(object => generateHtmlForObject(object)).join('<hr>')}
`;

router.get('/:type/:id', (req, res) => {
    const type = req.params.type;
    const id = parseInt(req.params.id);

    const jsonData = getJsonContent(type);

    if (!jsonData) {
        res.status(404).send('Type not found');
        return;
    }

    const object = jsonData.find(obj => obj.id === id);

    if (!object) {
        res.status(404).send('Object not found');
        return;
    }

    res.send(generateHtmlForObject(object));
});

router.get('/:type', (req, res) => {
    const type = req.params.type;

    const jsonData = getJsonContent(type);

    if (!jsonData) {
        res.status(404).send('Type not found');
        return;
    }

    res.send(generateHtmlForType(type, jsonData));
});

router.get('/', (req, res) => {
    const ducks = getJsonContent('ducks');
    const geese = getJsonContent('geese');
    const hens = getJsonContent('hens');

    if (!ducks || !geese || !hens) {
        res.status(500).send('Error reading JSON files');
        return;
    }

    const allObjects = [...ducks, ...geese, ...hens];
    const html = allObjects.map(object => generateHtmlForObject(object)).join('<hr>');

    res.send(`
        <h2>All Objects</h2>
        ${html}
    `);
});

module.exports = router;
