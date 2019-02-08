const environment = process.env.ENVIRONMENT || 'development';
const config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);

// const knex = require('knex');

// const knexConfig = require('../knexfile');
// const environment = process.env.ENVIRONMENT || 'development';

// const db = knex(knexConfig[environment]);

// module.exports = db;