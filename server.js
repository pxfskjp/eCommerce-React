const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// const knex = require('./db/db.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

// const register = require('./register');  // Should go to index.js in register folder
// server.use('api/register', register);



module.exports = server;