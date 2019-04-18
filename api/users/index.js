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
        // image_id: image_id,
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

    db.getUserInfo(uid)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error.message);
        })
})

router.put('/updateuserdetails', (req, res) => {
	const uid = req.body.uid;
	const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        home_street_address: req.body.home_street_address
	};
	
	console.log('user object in /updateuserdetails endpoint', user);

    db.updateUserDetails(uid, user)  
        .then(response_data => {
            res.status(200).json(user);     // send the updated user info back to display on accout page
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to update account information" });
            console.log(error.message);
        })
})

module.exports = router;
