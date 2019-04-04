const express = require('express');
const router = express.Router();
const firebase = require("firebase/app");
const db = require('../../db/helpers/users');

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').load();
}
   
   
// Add additional services that you want to use
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
   
   
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,	
};

firebase.initializeApp(config);    

router.post('/register', (req, res) => {
    let { firstname, lastname, email, image_id, uid } = req.body;
    
    let newUser = {
        firstname: firstname,
        lastname: lastname,
        email: email,  
        image_id: image_id,
        uid: uid
    };
    
    db.createUser(newUser)
        .then(response => {
            console.log('response from db insert newUser: ', response);
            res.status(200).json(response);
        })
        .catch(error => {  // catch error from insert new rep request
            console.log(error.message);
            res.status(500).json({message: error.message});
        })
})

module.exports = router;
