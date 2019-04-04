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
server.use(morgan('dev'));
server.use(cors());
server.use(helmet());

server.get('/',(req, res) => {
    res.send("Server base URL is working...");
});

// Verify requests using Firebase auth:
server.use(async(req,res) => {
    const idToken = req.headers.authorization;  
    console.log('idToken at server: ', idToken);
    try {
        await admin.auth().verifyIdToken(idToken)       // verify the idToken of the incoming req
          .then(decodedToken => {                       // get the decoded token back from Firebase
            req.body.uid = decodedToken.uid;            // add the uid from the decoded token to req.body
            return req.next();                          // return and move to the next (.then) part of the original req
          });
      }
      catch(error) {
        res.status(401).json({message: error.message});
      }
})


server.use('/api/users', userRoutes);
// server.use('/api/login', loginRoutes);

module.exports = server;