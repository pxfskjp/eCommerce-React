const express = require('express');
const router = express.Router();
const db = require('../../db/helpers/register');

router.post('/', (req, res) => {
    let { firstName, lastName, email, uid } = req.body;
    let image_id = 1;   // use default profile image until image upload is built
    
    let newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,  
        image_id: image_id,
        uid: uid
    };

    db.insert(newUser)
        .then(response => {
            console.log('response from db insert newUser: ', response);
            res.status(200).json(response);
        })
        .catch(error => {  // catch error from insert new rep request
            console.log(error.message);
            res.status(500).json({message: error.message});
        })
})