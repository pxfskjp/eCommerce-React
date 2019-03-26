const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// const knex = require('./db/db.js');
const registerRoutes = require('./api/register');    // Should go to index.js in register folder
const loginRoutes = require('./api/login');          

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api/register', registerRoutes);
server.use('/api/login', loginRoutes);

module.exports = server;