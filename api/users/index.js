const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
const multipart = require("connect-multiparty")();

const usersDb = require('../../db/helpers/users');
const imagesDb = require('../../db/helpers/images');

// Register a new user:
router.post('/register', (req, res) => {
    let { firstName, lastName, email, uid, addressDetails } = req.body;

    const full_address = addressDetails.formattedAddress;

    // get address component LONG NAMES to store in DB:
    const street_number = addressDetails.addressComponents.filter(component => component.types.includes("street_number"))[0].long_name;
    const street_name = addressDetails.addressComponents.filter(component => component.types.includes("route"))[0].long_name;
    const city = addressDetails.addressComponents.filter(component => component.types.includes("locality"))[0].long_name;
    const county = addressDetails.addressComponents.filter(component => component.types.includes("administrative_area_level_2"))[0].long_name;
    const state = addressDetails.addressComponents.filter(component => component.types.includes("administrative_area_level_1"))[0].long_name;
    const country = addressDetails.addressComponents.filter(component => component.types.includes("country"))[0].long_name;
    const zip_code = addressDetails.addressComponents.filter(component => component.types.includes("postal_code"))[0].long_name;
    // const zip_code_ext = addressDetails.addressComponents.filter(component => component.types.includes("postal_code_suffix"))[0].long_name;
    const lat = addressDetails.latLng.lat;
    const lng = addressDetails.latLng.lng;
    const place_id = addressDetails.placeId;

    const defaultImage = { url: 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg' };

    imagesDb.addImage(defaultImage)     // create image using default URL (no cloudinary)
        .then(image_id => {             // addImage returns id (PK) of new image
            const newUser = {
                first_name: firstName,
                last_name: lastName,
                email,  
                image_id,
                uid,
                full_address,
                street_number,
                street_name,
                city, 
                county,
                state,
                country,
                zip_code,
                lat,
                lng,
                place_id,
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
})

// Get user details on a logged-in user:
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

// Update profile details for a logged in user:
router.put('/updateuserdetails', (req, res) => {

    let { first_name, last_name, email, uid, addressDetails } = req.body;

    let user = {};

    // check if addressDetails were updated and sent with request:
    if (addressDetails.addressComponents) {
        // console.log('addressDetails provided');
        const full_address = addressDetails.formattedAddress;
        // get address component LONG NAMES to store in DB:
        const street_number = addressDetails.addressComponents.filter(component => component.types.includes("street_number"))[0].long_name;
        const street_name = addressDetails.addressComponents.filter(component => component.types.includes("route"))[0].long_name;
        const city = addressDetails.addressComponents.filter(component => component.types.includes("locality"))[0].long_name;
        const county = addressDetails.addressComponents.filter(component => component.types.includes("administrative_area_level_2"))[0].long_name;
        const state = addressDetails.addressComponents.filter(component => component.types.includes("administrative_area_level_1"))[0].long_name;
        const country = addressDetails.addressComponents.filter(component => component.types.includes("country"))[0].long_name;
        const zip_code = addressDetails.addressComponents.filter(component => component.types.includes("postal_code"))[0].long_name;
        // const zip_code_ext = addressDetails.addressComponents.filter(component => component.types.includes("postal_code_suffix"))[0].long_name;
        const lat = addressDetails.latLng.lat;
        const lng = addressDetails.latLng.lng;
        const place_id = addressDetails.placeId;
        // Define user columns to be updated in DB, including address components:
        user = {
            first_name,
            last_name,
            //email,
            full_address,
            street_number,
            street_name,
            city, 
            county,
            state,
            country,
            zip_code,
            lat,
            lng,
            place_id,
        };
    } else {
        // console.log('addressDetails NOT provided');
        // Define user columns to be updated in DB, NOT including address components:
        user = {
            first_name,
            last_name
        };
        console.log('user is:', user);
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

// Update a user's profile image:
router.put('/updateimage', multipart, (req, res) => {
    cloudinary.v2.uploader.upload(req.files.image_file.path, async function(error, result) {
        console.log('/updateimage req.files.image_file: ', req.files.image_file);
        if (error) {
            res.status(500).json({message: 'Image upload failed.'});
        }
        else {
            try {
                const id = req.body.image_id;
                const url = result.url;
                const newImage = await imagesDb.updateImage(id, url);
        
                res.status(200).json(newImage);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({message: error.message});
            }
        }
    });
})

module.exports = router;
