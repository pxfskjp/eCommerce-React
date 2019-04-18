const express = require('express');
const router = express.Router();
const firebase = require("firebase/app");
const usersDb = require('../../db/helpers/users');
const imagesDb = require('../../db/helpers/images');

router.post('/register', (req, res) => {
    let { firstname, lastname, email, uid } = req.body;
    
    // let newUser = {
    //     firstname: firstname,
    //     lastname: lastname,
    //     email: email,  
    //     // image_id: image_id,
    //     uid: uid
    // };

    const defaultImage = { url: 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg' };

    imagesDb.addImage(defaultImage)  // create image using default URL and return image_id
        .then(image_id => {
            const newUser = {
                firstname: firstname,
                lastname: lastname,
                email: email,  
                image_id: image_id,
                uid: uid
            };

            usersDb.createUser(newUser)
                .then(response => {
                    console.log('response from db insert newUser: ', response);
                    res.status(200).json(response);
                })
                .catch(error => {  // catch error from create new user request
                    console.log(error.message);
                    res.status(500).json({message: error.message});
                })
        })

    // usersDb.createUser(newUser)
    //     .then(response => {
    //         console.log('response from db insert newUser: ', response);
    //         res.status(200).json(response);
    //     })
    //     .catch(error => {  // catch error from insert new rep request
    //         console.log(error.message);
    //         res.status(500).json({message: error.message});
    //     })
})

router.get('/userinfo', (req, res) => {
    let uid = req.body.uid;

    usersDb.getUserInfo(uid)
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

    usersDb.updateUserDetails(uid, user)  
        .then(response_data => {
            res.status(200).json(user);     // send the updated user info back to display on accout page
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to update account information" });
            console.log(error.message);
        })
})

module.exports = router;
