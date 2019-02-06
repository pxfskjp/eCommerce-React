const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const PORT = process.env.PORT || 3000;   // server will be hosted locally at localhost:3000
const knex = require('./db/db.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});