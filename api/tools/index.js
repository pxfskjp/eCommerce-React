const express = require('express');
const router = express.Router();
const db = require('../../db/helpers/tools');

router.post('/newTool', (req, res) => {
    let { brand, name, description, price, available, uid } = req.body;
    let image_id = 1;   // use default profile image until image upload is built
    
    let newTool = {
        // from user input:
            // owner_id, not Null
            // brand
            // name, not Null
            // description, not Null
            // price, not Null, defaults to 0

        // from db:
            // home_street_address
            // current_street_address
            // home_lat
            // home_lon
            // current_lat
            // current_lon
            // available, defaults to false
            // rating
            // owner_rating
    };

    db.createTool(newTool)
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
