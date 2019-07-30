const express = require('express');
const router = express.Router();

const toolsDb = require('../../db/helpers/tools');
// const usersDb = require('../../db/helpers/users');
// const imagesDb = require('../../db/helpers/images');
const datesDb = require('../../db/helpers/dates');

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