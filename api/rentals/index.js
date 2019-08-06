const express = require('express');
const router = express.Router();
const toolsDb = require('../../db/helpers/tools');
const datesDb = require('../../db/helpers/dates');
const rentalsDb = require('../../db/helpers/rentals');
const imagesDb = require('../../db/helpers/images');


// Create a new Rental (first create reserved dates, then add ReservedDatesID to Rental):

router.post('/newrental', async (req, res) => {
    const uid = req.body.uid;

    let { startDate, endDate, createDate, toolId, resType } = req.body;
    console.log('Rental startDate: ', startDate);
    let datesData = {
        tool_id: toolId,
        res_type: resType,
        renter_uid: uid,
        start_date: startDate,
        end_date: endDate,
    }

    try {
        const toolData = await toolsDb.getToolDataForRental(toolId);    // get tool's owner uid and price
        console.log('toolData: ', toolData);
        const ReservedDatesID = await datesDb.reserveDates(datesData);  // Add dates to reserved_dates table and get id back from table
        console.log('ReservedDatesID; ', ReservedDatesID);

        let rentalData = {
            RenterUID: uid,
            ToolID: toolId,
            OwnerUID: toolData.owner_uid,
            ReservedDatesID,
            Status: 'upcoming',
            DailyRentalPrice: toolData.price,
            CreateDate: createDate
        }
        console.log('rentalData: ', rentalData);

        rentalsDb.createRental(rentalData)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                console.log('error at createRental in newrental endpoint');
                res.status(500).json(error.message);
            })
    }
    catch(error) {
        console.log('error at end of newrental endpoint');
        res.status(500).json(error.message);
    }
})

// Get reserved dates for a single tool, 
// including reserved dates from non-cancelled rentals and reserved dates from owner:

router.get('/tool/reserveddates/:id', (req, res) => {
    // console.log(req.params.id);
    const id = req.params.id;
    let allReservedDates = [];
    datesDb.getRentalDates(id)
        .then(rentalDates => {    // dates is an array of objects each containing ReservedDatesID, startDate, and endDate
            // console.log('RentalDates: ', dates);
            // res.status(200).json(dates);
            datesDb.getOwnerReservedDates(id)
                .then(ownerDates => {
                    allReservedDates = rentalDates.concat(ownerDates);  // create new array combining owner reserved dats and rental dates
                    // console.log('allReservedDates: ', allReservedDates);
                    res.status(200).json(allReservedDates);
                })
                .catch(error => {
                    res.status(500).json(error.message);
                })
        })
        .catch(error => {
            res.status(500).json(error.message);
        })
})

// Get all rentals associated with a user
// use POST in order to send req.body with data indicating the Rental Status being requested
router.post('/owner/getrentals/', (req, res) => {
    // Required data from request:
        // uid of current user
        // Rental Status; if multiple Status categories, request will send an array containing the required status categories
        
    const { uid, statuses } = req.body;     // uid is string, statuses is array
    // console.log(statuses);
    rentalsDb.getOwnerRentals(uid, statuses)
        .then(rentals => {
            // console.log('response from DB getOwnerRentals:', rentals);
            const rentalsWithImages = rentals.map(rental => {
                const imageQuery = imagesDb.getFirstToolImage(rental.ToolID); // get the first image URL for the tool in each rental
                return imageQuery 
                    .then(image => {
                        console.log('response from db getFirstToolImage query: ', image);
                        rental.ToolImageURL = image.url;  // append image to rental object
                    })
                    // .catch(error => {
                    //     res.status(500).json(error.message);
                    // })
            });

            // console.log('toolsWithImages for /mytools response: ', toolsWithImages);
            
            Promise.all(rentalsWithImages)
                .then(completed => {
                    rentals.data = completed;
                    res.status(200).json(rentals);  // Send back tools with images appended as response
                })
                .catch(error => {
                    res.status(500).json(error.message);
                })
        })
        .catch(error => {
            console.log(error.message);
            res.status(500).json(error.message);
        })
})

router.post('/renter/getrentals/', (req, res) => {
    // Required data from request:
        // uid of current user
        // Rental Status; if multiple Status categories, request will send an array containing the required status categories
        
    const { uid, statuses } = req.body;     // uid is string, statuses is array
    // console.log(statuses);
    rentalsDb.getRenterRentals(uid, statuses)
        .then(rentals => {
            // console.log('response from DB getOwnerRentals:', rentals);
            const rentalsWithImages = rentals.map(rental => {
                const imageQuery = imagesDb.getFirstToolImage(rental.ToolID); // get the first image URL for the tool in each rental
                return imageQuery 
                    .then(image => {
                        // console.log('response from db getFirstToolImage query: ', image);
                        rental.ToolImageURL = image.url;  // append image to rental object
                    })
                    // .catch(error => {
                    //     res.status(500).json(error.message);
                    // })
            });

            // console.log('toolsWithImages for /mytools response: ', toolsWithImages);
            
            Promise.all(rentalsWithImages)
                .then(completed => {
                    rentals.data = completed;
                    res.status(200).json(rentals);  // Send back tools with images appended as response
                })
                .catch(error => {
                    res.status(500).json(error.message);
                })
        })
        .catch(error => {
            console.log(error.message);
            res.status(500).json(error.message);
        })
})

router.get('/owner/rental/:rentalId', (req, res) => {
    const rentalId = req.params.rentalId;
    rentalsDb.getRental(rentalId)
        .then(rental => {
            console.log('Rental data from db received at API layer: ', rental);
        })
        .catch(error => {
            res.status(500).json(error.message);
        })
})

module.exports = router;