const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// const knex = require('./db/db.js');
const register = require('./register');    // Should go to index.js in register folder

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api/register', register);

module.exports = server;

// ********

// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');

// const registration = require('./register');  // refers to ./register/index.js, which has module.exports = server;
// const upload = require('./upload');
// const tools = require('./tools');
// const users = require('./users');
// const reviews = require('./reviews');

// const server = express();

// server.use(express.json());
// server.use(cors());
// server.use(helmet());

// server.use('/api/registration', registration);
// server.use('/api/upload', upload);
// server.use('/api/tools', tools);
// server.use('/api/users', users);
// server.use('/api/reviews', reviews);

// module.exports = server;
