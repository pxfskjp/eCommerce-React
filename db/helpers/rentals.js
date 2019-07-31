const db = require('../db.js');

module.exports = {
    createRental,
    getOwnerRentals
}

function createRental(rental) {
    return db('Rentals')
        .insert(rental)
        .returning('RentalID')
        .then(RentalIDs => RentalIDs[0])
        .catch(error => {
            console.log(error.message);
            res.status(500).json(error.message);
        })
}

function getOwnerRentals(uid, statuses) {
    return db
        .select([
            'Rentals.RentalID',
            'Rentals.RenterUID',
            'Rentals.OwnerUID',
            // 'Rentals.ToolID',
            'Rentals.ReservedDatesID',
            'Rentals.Status',
            'Rentals.DailyRentalPrice',
            'tools.id as ToolId',
            'tools.brand as ToolBrand',
            'tools.name as ToolName',
            'users.first_name as RenterFirstName',
            'users.last_name as RenterLastName'
        ])
        .from('Rentals')
        .whereIn('Rentals.Status', statuses)
        .where('Rentals.OwnerUID', uid)
        .innerJoin('tools', 'Rentals.ToolID', 'tools.id')
        .innerJoin('users', 'Rentals.RenterUID', 'users.uid');

        // return query
        //     .havingIn('Rentals.Status', statuses);
        // .groupBy('Rentals.RentalID', 'tools.brand');
        // .then(rentals => rentals)
        // .catch(error => {
        //     console.log(error.message);
        // })

}