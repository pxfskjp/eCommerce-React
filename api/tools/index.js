const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
const multipart = require("connect-multiparty")();

const toolsDb = require('../../db/helpers/tools');
const usersDb = require('../../db/helpers/users');
const imagesDb = require('../../db/helpers/images');
const datesDb = require('../../db/helpers/dates');
const rentalsDb = require('../../db/helpers/rentals');

// Import .env config vars for dev Environment
if (process.env.ENVIRONMENT === 'development') { 
    require('dotenv').config(); 
}
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').load();
}

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

router.post('/newtool', multipart, (req, res) => {
    let { brand, name, description, price } = req.body;
    let owner_uid = req.body.uid;
    let available = true;
    
    let newTool = {
        brand: brand,
        name: name,
        description: description,
        price: price,
        owner_uid: owner_uid,
        available: available
    };

    toolsDb.createTool(newTool)     // insert new tool into tools table
        .then(response => {
            console.log('response from db insert newTool: ', response);

            const tool_id = response;     // response is the id (PK) of the new tool in tools table

            cloudinary.v2.uploader.upload(req.files.image_file.path, async function(error, result) {
                console.log('/newtool req.files.image_file: ', req.files.image_file);
                if (error) {
                    res.status(500).json({message: 'Image upload failed.'});
                }
                else {
                    try {
                        const imageId = await imagesDb.addImage({ url: result.url});  // insert the image url into the images table and get back the id of the new image in the images table

                        console.log('id of image added to images table: ', imageId);
                
                        await imagesDb.addToolImage({ image_id: imageId, tool_id });
                
                        res.status(200).json(response);
                    }
                    catch (error) {
                        console.log(error);
                        res.status(500).json({message: error.message});
                    }
                }
            });
        })
        .catch(error => {  // catch error from insert new rep request
            console.log(error.message);
            res.status(500).json({message: error.message});
        })
})

router.post('/newimage', multipart, (req, res) => {
    const tool_id = req.body.id;

    cloudinary.v2.uploader.upload(req.files.image_file.path, async function(error, result) {
        console.log('/newimage req.files.image_file: ', req.files.image_file);
        if (error) {
            res.status(500).json({message: 'Image upload failed.'});
        }
        else {
            try {
                const imageId = await imagesDb.addImage({ url: result.url});  // insert the image url into the images table and get back the id of the new image in the images table
                console.log('id of image added to images table: ', imageId);
                await imagesDb.addToolImage({ image_id: imageId, tool_id });
                res.status(200).json(imageId);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({message: error.message});
            }
        }
    });
})

router.get('/mytools', (req, res) => {
    let uid = req.body.uid;

    toolsDb.getMyTools(uid)
        .then(tools => {                  // db responds with array of all the user's tools

            const toolsWithImages = tools.map(tool => {
                const imagesQuery = imagesDb.getToolImages(tool.id); // get array of image URLs for each tool
                return imagesQuery 
                    .then(images => {
                        console.log('response from db getToolImages query: ', images);
                        tool.images = images;  // append images array to tool object
                    })
                    // .catch(error => {
                    //     res.status(500).json(error.message);
                    // })
            });
            
            Promise.all(toolsWithImages)
                .then(completed => {
                    tools.data = completed;
                    res.status(200).json(tools);  // Send back tools with images appended as response
                })
        })
        .catch(error => {
            res.status(500).json(error.message);
        })
})

router.post('/findtools', async (req, res) => {
    let uid = req.body.uid;
    let city = req.body.city;

    try {
        console.log('req.body.city: ', city);
        if (city === 'renter') {
            // call db function to get renter's city:
            const location = await usersDb.getUserLocation(uid);
            city = location.city;
        }
        console.log('city: ', city)

        toolsDb.findTools(city)
            .then(tools => {    // db responds with array of all available tools
                const toolsWithImages = tools.map(tool => {
                    const imagesQuery = imagesDb.getToolImages(tool.id); // get array of image URLs for each tool
                    return imagesQuery 
                        .then(images => {
                            tool.images = images;  // append images array to tool object
                        })
                        // .catch(error => {
                        //     res.status(500).json(error.message);
                        // })
                });
                
                Promise.all(toolsWithImages)
                    .then(completed => {
                        tools.data = completed;
                        res.status(200).json(tools);  // Send back tools with images appended as response
                    })
            })
            .catch(error => {
                res.status(500).json(error.message);
            })
    }
    
    catch(error) {
        res.status(500).json(error.message);
    }
})

// get data on a single tool for Renter to view:
router.get('/renter/singletool/:id', (req, res) => {
    const uid = req.body.uid;
    const id = req.params.id;
    toolsDb.getTool(id)
        .then(tool => {
            toolsDb.getToolRatings(id)
                .then(ratings => {
                    // console.log('tool ratings from db:', ratings);
                    const sumOfRatings = ratings.reduce((acc, cur) => {
                        return acc + cur.ratingFromRenter;
                    }, 0);
                    // console.log('sum of ratings: ', sumOfRatings);
                    const avgRating = sumOfRatings / ratings.length;
                    const truncatedAvgRating = Math.floor(avgRating * 100) / 100;
                    // console.log('average rating: ', truncatedAvgRating);
                    // append the average rating to the tool object:
                    tool.rating = truncatedAvgRating;

                    imagesDb.getToolImages(id) // get array of image URLs for each tool
                        .then(images => {
                            // append images array to tool object:
                            tool.images = images;
                            // add uid to response to identify renter on front end (used for messaging via Firestore):
                            tool.renterUid = uid;
                            // Send back tool with images appended as response:
                            res.status(200).json(tool);
                        })
                        .catch(error => {
                            res.status(500).json(error.message);
                        });
                })
                .catch(error => {
                    res.status(500).json(error.message);
                })
                
        })
        .catch(error => {
            res.status(500).json(error.message);
        });
})

// get data on a single tool for Owner to view:
router.get('/owner/singletool/:id', async (req, res) => {
    const toolId = req.params.id;

    try {
        const tool = await toolsDb.getMyTool(toolId);           // get tool from db
        const images = await imagesDb.getToolImages(toolId);    // get images tied to the tool
        tool.images = images;                                   // add images to the tool object
        const rentals = await rentalsDb.getToolRentals(toolId);
        console.log('tool rentals:', rentals);
        tool.rentals = rentals.length ? rentals : [];
        res.status(200).json(tool); 
    }
    catch(error) {
        res.status(500).json(error.message);
    }
})

// Endpoint for an owner to reserve/block dates:
router.post('/reservedates', (req, res) => {
    const uid = req.body.uid;

    let { startDate, endDate, toolId, resType } = req.body;

    let reservationData = {
        tool_id: toolId,
        res_type: resType,
        renter_uid: uid,
        start_date: startDate,
        end_date: endDate,
    }

    datesDb.reserveDates(reservationData)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error.message);
        })

})

router.delete('/tool/delete/:id', async (req, res) => {
    const toolId = req.params.id;
    console.log('delete tool toolId', toolId);

    try {
        await datesDb.deleteReservedDates(toolId);
        await rentalsDb.deleteToolRentals(toolId);
        await toolsDb.deleteToolImages(toolId);
        await toolsDb.deleteTool(toolId);
        res.status(200).json('Tool deleted');
    }
    catch(error) {
        res.status(500).json(error.message);
    }
    

    // toolsDb.deleteToolImages(id)
    //     .then(toolImagesResponse => {
    //         datesDb.deleteReservedDates(id)
    //             .then(datesResponse => {
    //                 toolsDb.deleteTool(id)
    //                 .then(toolResponse => {
    //                     console.log(toolResponse);
    //                     res.status(200).json(toolResponse);
    //                 })
    //                 .catch(error => {
    //                     console.log('error deleting tool:', error);
    //                     res.status(500).json(error.message);
    //                 });
    //             })
    //             .catch(error => {
    //                 console.log('error deleting dates:', error);
    //                 res.status(500).json(error.message);
    //             })
    //     })
    //     .catch(error => {
    //         console.log('error deleting tool images:', error);
    //         res.status(500).json(error.message);
    //     });
})

router.put('/updatetooldetails/:id', (req, res) => {
    const id = req.params.id;
    let { brand, name, description, price, available } = req.body;
    let tool = {
        brand, 
        name, 
        description, 
        price, 
        available
    };
    toolsDb.updateToolDetails(id, tool)
        .then(response => {
            res.status(200).json(response);     // send the updated user info back to display on accout page
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to update account information" });
            console.log(error.message);
        })
})


module.exports = router;

// router.post('/newtool', (req, res) => {
//     // from user input:

//         // brand
//         // name, not Null
//         // description, not Null
//         // price, not Null, defaults to 0

//     // from db:
//         // owner_uid, not Null
//         // home_street_address
//         // current_street_address
//         // home_lat
//         // home_lon
//         // current_lat
//         // current_lon
//         // available, defaults to false
//         // rating
//         // owner_rating

//     let { brand, name, description, price, image_file } = req.body;
//     let owner_uid = req.body.uid;
//     let available = true;
    
//     let newTool = {
//         brand: brand,
//         name: name,
//         description: description,
//         price: price,
//         owner_uid: owner_uid,
//         available: available
//     };

//     toolsDb.createTool(newTool)
//         .then(response => {
//             console.log('response from db insert newTool: ', response);
            
            
            
//             res.status(200).json(response);
//         })
//         .catch(error => {  // catch error from insert new rep request
//             console.log(error.message);
//             res.status(500).json({message: error.message});
//         })
// })