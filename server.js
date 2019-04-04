const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// const knex = require('./db/db.js');

      
const server = express();

if (process.env.ENVIRONMENT == 'development') { 
    require('dotenv').config(); 
}

const admin = require('firebase-admin');

const userRoutes = require('./api/users');    // All CRUD endpoints for users

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api/users', userRoutes);
// server.use('/api/login', loginRoutes);

module.exports = server;