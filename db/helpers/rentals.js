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
    return db('Rentals')
        .select([
            'Rentals.RentalID',
            'Rentals.RenterUID',
            'Rentals.OwnerUID',
            'Rentals.ToolID',
            'Rentals.ReservedDatesID',
            'Rentals.Status',
            'Rentals.DailyRentalPrice',
            'tools.brand as ToolBrand',
            'tools.name as ToolName',
            'users.first_name as RenterFirstName',
            'users.last_name as RenterLastName'
        ])
        .from('Rentals')
        .leftJoin('tools', 'tools.id', 'Rentals.ToolID')
        .leftJoin('users', 'users.uid', 'Rentals.RenterUID')
        .where('Rentals.OwnerUID', uid)
        .where('Rentals.Status', `ANY(${statuses})`)
        .then(rentals => rentals)
        .catch(error => {
            console.log(error.message);
        })

}