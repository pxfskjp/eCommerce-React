const db = require('../db.js');

module.exports = {
    createRental,
    getOwnerRentals,
    getRenterRentals,
    getOwnerRental
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
            'Rentals.ToolID',
            'Rentals.ReservedDatesID',
            'Rentals.Status',
            'Rentals.DailyRentalPrice',
            'reserved_dates.start_date as StartDate',
            'reserved_dates.end_date as EndDate',
            'tools.brand as ToolBrand',
            'tools.name as ToolName',
            'users.first_name as RenterFirstName',
            'users.last_name as RenterLastName'
        ])
        .from('Rentals')
        .whereIn('Rentals.Status', statuses)
        .where('Rentals.OwnerUID', uid)
        .innerJoin('reserved_dates', 'Rentals.ReservedDatesID', 'reserved_dates.id')
        .innerJoin('tools', 'Rentals.ToolID', 'tools.id')
        .innerJoin('users', 'Rentals.RenterUID', 'users.uid');
}

function getRenterRentals(uid, statuses) {
    return db
        .select([
            'Rentals.RentalID',
            'Rentals.RenterUID',
            'Rentals.OwnerUID',
            'Rentals.ToolID',
            'Rentals.ReservedDatesID',
            'Rentals.Status',
            'Rentals.DailyRentalPrice',
            'reserved_dates.start_date as StartDate',
            'reserved_dates.end_date as EndDate',
            'tools.brand as ToolBrand',
            'tools.name as ToolName',
            'users.first_name as OwnerFirstName',
            'users.last_name as OwnerLastName'
        ])
        .from('Rentals')
        .whereIn('Rentals.Status', statuses)
        .where('Rentals.RenterUID', uid)
        .innerJoin('reserved_dates', 'Rentals.ReservedDatesID', 'reserved_dates.id')
        .innerJoin('tools', 'Rentals.ToolID', 'tools.id')
        .innerJoin('users', 'Rentals.OwnerUID', 'users.uid');
}

function getOwnerRental(rentalId) {
    return db
        .select([
            'Rentals.RentalID',
            'Rentals.RenterUID',
            'Rentals.OwnerUID',
            'Rentals.ToolID',
            'Rentals.ReservedDatesID',
            'Rentals.Status',
            'Rentals.DailyRentalPrice',
            'reserved_dates.start_date as StartDate',
            'reserved_dates.end_date as EndDate',
            'tools.brand as ToolBrand',
            'tools.name as ToolName',
            'users.first_name as RenterFirstName',
            'users.last_name as RenterLastName'
        ])
        .from('Rentals')
        .where('Rentals.RentalID', rentalId)
        .first();
}