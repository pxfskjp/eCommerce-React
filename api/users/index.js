const express = require('express');
const router = express.Router();
const firebase = require("firebase/app");
const db = require('../../db/helpers/users');

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

router.get('/userinfo', (req, res) => {
    let uid = req.body.uid;

    
})

module.exports = router;
