const express = require('express');

const apiRouter = require('./api-router.js');
const configureMiddleware = require('./configure-middleware.js');

const server = express();

configureMiddleware(server);

server.use('/api', apiRouter);

const projectName = 'food-truck-trackr';

server.get('/', (req, res) => {
    res.json({ message: `Project: ${projectName} is up and running!` })
})

module.exports = server;