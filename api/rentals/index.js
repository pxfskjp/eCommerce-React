const express = require('express');
const router = express.Router();
const toolsDb = require('../../db/helpers/tools');
const datesDb = require('../../db/helpers/dates');

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
        // datesDb.reserveDates(datesData)
        // .then(response => { // response is id of new entry in reserved_dates
        //     // toolsDb.createRental

        // })
        // .catch(error => {
        //     res.status(500).json(error.message);
        // })

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

        toolsDb.createRental(rentalData)
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

module.exports = router;