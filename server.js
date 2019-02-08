const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// const knex = require('./db/db.js');
const register = require('./register');    // Should go to index.js in register folder
const login = require('./login');          

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api/register', register);
server.use('/api/login', login);

module.exports = server;

