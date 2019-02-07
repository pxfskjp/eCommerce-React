const express = require('express');
const bcrypt = require('bcrypt');

// *** TO DO ***
// DONE create an auth folder with auth middleware/helper functions 
// DONE generate an auth token in this file
// DONE import/require db confit (db.js) filepath


const { generateToken } = require('../middleware/authenticate.js');
const db = require('../db/db.js');

const router = express.Router();

