const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
const multiparty = require("connect-multiparty")();

const toolsDb = require('../../db/helpers/tools');
const usersDb = require('../../db/helpers/users');
const imagesDb = require('../../db/helpers/images');


cloudinary.config({ 
    cloud_name:"use-my-tools-csr",
    api_key:"654865738498236",
    api_secret:"l6t5As3rK6IZBecdjCadgjYDizs"
  });

router.post('/newtool', multiparty, (req, res) => {
    // from user input:

        // brand
        // name, not Null
        // description, not Null
        // price, not Null, defaults to 0

    // from db:
        // owner_uid, not Null
        // home_street_address
        // current_street_address
        // home_lat
        // home_lon
        // current_lat
        // current_lon
        // available, defaults to false
        // rating
        // owner_rating
    
    cloudinary.v2.uploader.upload(req.files.image.path, async function(error, result) {
        if (error) {
            res.status(500).json({message: 'Image upload failed.'});
        }
        else {
            try {
                await db.insert({ url: result.url}).into('images');
        
                const image = await db.select().from('images').where('url', result.url).first();
        
                console.log(image.id);
        
                await db.insert({img_id: image.id, tool_id}).into('tool_images');
        
                res.status(201).json({ id: image.id });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({message: error.message});
            }
        }
    });

    let { brand, name, description, price } = req.body;
    let owner_uid = req.body.uid;
    let available = true;
    
    let newTool = {
        brand: brand,
        name: name,
        description: description,
        price: price,
        owner_uid: owner_uid,
        available: available,
    };

    toolsDb.createTool(newTool)
        .then(response => {
            console.log('response from db insert newTool: ', response);
            res.status(200).json(response);
        })
        .catch(error => {  // catch error from insert new rep request
            console.log(error.message);
            res.status(500).json({message: error.message});
        })
})

module.exports = router;
