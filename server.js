const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
// const knex = require('./db/db.js');

const userRoutes = require('./api/users');    // All CRUD endpoints for users
      

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api/users', userRoutes);
// server.use('/api/login', loginRoutes);

module.exports = server;