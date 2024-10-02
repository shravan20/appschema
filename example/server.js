const express = require('express');
const bodyParser = require('body-parser');
const { AppwriteConnection, Model, Repository } = require('appschema');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

AppwriteConnection.initialize(process.env.APPWRITE_ENDPOINT, process.env.PROJECT_ID);

// model definition sample
const userSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        age: { type: 'number' }
    },
    required: ['name', 'age'],
    additionalProperties: false
};

// set Model and Repository for the tes user collection
const userModel = new Model(userSchema, process.env.COLLECTION_ID, process.env.DATABASE_ID);
const userRepository = new Repository(userModel);

// add a new test user
app.post('/test', async (req, res) => {

    try {
        const user = await userRepository.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// fetch a test user by ID
app.get('/test/:id', async (req, res) => {

    try {
        console.log(process.env.DATABASE_ID)
        const user = await userRepository.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
