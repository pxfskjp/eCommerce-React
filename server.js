const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const multipart = require("connect-multiparty")();

// Import .env config vars for dev Environment
if (process.env.ENVIRONMENT === 'development') { 
    require('dotenv').config(); 
}
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').load();
}

// Firebsae imports:
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
const admin = require('firebase-admin');     

admin.initializeApp({
    credential: admin.credential.cert({
       projectId: process.env.FIREBASE_PROJECT_ID,
       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
       privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
    databaseURL: process.env.FIREBASE_DB_URL
});
   
   
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,	
};

firebase.initializeApp(firebaseConfig);    

// Create Express server
const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use(cors());
server.use(helmet());

// Sanity check to see if base URL is live:
server.get('/',(req, res) => {
    res.send("Server base URL is working...");
});

// Import API route/endpoint files:
const userRoutes = require('./api/users');    // All CRUD endpoints for users
const toolsRoutes = require('./api/tools');   // All CRUD endpoints for tools

// Verify requests using Firebase-admin auth:
server.use(multipart, async(req,res) => {
    console.log('server auth hit with req.body: ', req.body);
    const idToken = req.headers.authorization;  
    try {
        await admin.auth().verifyIdToken(idToken)       // verify the idToken of the incoming req
          .then(decodedToken => {                       // get the decoded token back from Firebase
            
            req.body.uid = decodedToken.uid;            // add the uid from the decoded token to req.body
            return req.next();                          // return and move to the next part of the original req
          });
      }
      catch(error) {
        res.status(401).json({message: error.message});
      }
})


server.use('/api/users', userRoutes);
server.use('/api/tools', toolsRoutes);

module.exports = server;