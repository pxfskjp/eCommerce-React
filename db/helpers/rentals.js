const db = require('../db.js');

module.exports = {
    createRental,
    getOwnerRentals,
    getRenterRentals,
    getOwnerRental,
    getRenterRental,
    updateRentalStatus,
    createCancelDate,
    getRenterRentalIDs,
    getOwnerRentalIDs,
    updateRentalRating
}

// function to create a new rental in the Rentals table:
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

// function to get all Rentals for a tool owner:
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

// function to get a specific Rental for an owner:
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
            'Rentals.ratingFromOwner',
            'reserved_dates.start_date as StartDate',
            'reserved_dates.end_date as EndDate',
            'tools.brand as ToolBrand',
            'tools.name as ToolName',
            'users.first_name as RenterFirstName',
            'users.last_name as RenterLastName'
        ])
        .from('Rentals')
        .where('Rentals.RentalID', rentalId)
        .innerJoin('reserved_dates', 'Rentals.ReservedDatesID', 'reserved_dates.id')
        .innerJoin('tools', 'Rentals.ToolID', 'tools.id')
        .innerJoin('users', 'Rentals.RenterUID', 'users.uid')
        .first();
}

// function to get all Rentals for a renter:
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

// function to get a specific Rental for a renter:
function getRenterRental(rentalId) {
    return db
        .select([
            'Rentals.RentalID',
            'Rentals.RenterUID',
            'Rentals.OwnerUID',
            'Rentals.ToolID',
            'Rentals.ReservedDatesID',
            'Rentals.Status',
            'Rentals.DailyRentalPrice',
            'Rentals.ratingFromRenter',
            'reserved_dates.start_date as StartDate',
            'reserved_dates.end_date as EndDate',
            'tools.brand as ToolBrand',
            'tools.name as ToolName',
            'users.first_name as OwnerFirstName',
            'users.last_name as OwnerLastName'
        ])
        .from('Rentals')
        .where('Rentals.RentalID', rentalId)
        .innerJoin('reserved_dates', 'Rentals.ReservedDatesID', 'reserved_dates.id')
        .innerJoin('tools', 'Rentals.ToolID', 'tools.id')
        .innerJoin('users', 'Rentals.OwnerUID', 'users.uid')
        .first();
}

function updateRentalStatus(rentalId, status) {
    return db('Rentals')
        .where('RentalID', rentalId)
        .update({ 'Status': status });
}

// function to update numerical rating for a rental
// rating arg should be a object, ie, { ratingByRenter: 4 } or { ratingByOwner: 4 }
function updateRentalRating(rentalId, rating) {
    return db('Rentals')
        .where('RentalID', rentalId)
        .update(rating);
}

function createCancelDate(rentalId, date) {
    return db('Rentals')
        .where('RentalID', rentalId)
        .update({ 'CancelDate': date });
}

// *** Functions for auto updating rental statuses:

function getRenterRentalIDs(uid, statuses) {
    return db
        .select([
            'Rentals.RentalID',
            'Rentals.Status',
            'Rentals.RenterUID',
            'reserved_dates.start_date as StartDate',
            'reserved_dates.end_date as EndDate'
        ])
        .from('Rentals')
        .where('Rentals.RenterUID', uid)
        .whereIn('Rentals.Status', statuses)
        .innerJoin('reserved_dates', 'Rentals.ReservedDatesID', 'reserved_dates.id');
}

function getOwnerRentalIDs(uid, statuses) {
    return db
        .select([
            'Rentals.RentalID',
            'Rentals.Status',
            'Rentals.OwnerUID',
            'reserved_dates.start_date as StartDate',
            'reserved_dates.end_date as EndDate'
        ])
        .from('Rentals')
        .where('Rentals.OwnerUID', uid)
        .whereIn('Rentals.Status', statuses)
        .innerJoin('reserved_dates', 'Rentals.ReservedDatesID', 'reserved_dates.id');
}

// getRentalIDsUpcomingToActive(uid, statuses)

// function getAllRentalIDsForUser(uid) {
//     return db
//         .select([
//             'Rentals.RentalID',
//             'Rentals.Status'
//         ])
//         .from('Rentals')
//         .where('Rentals.Status', 'upcoming')
//         .andWhere('Rentals.OwnerUID', uid).orWhere('Rentals.RenterUID', uid);
// }

// Function to get RentalID of every rental for a specific user 
// where the Rental Status is contained in statuses array arg:
// function getRentalIDs(uid, statuses) {
//     const query = db
//         .select([
//             'Rentals.RentalID',
//             'Rentals.Status'
//         ])
//         .from('Rentals')
//         .where('Rentals.OwnerUID', uid).orWhere('Rentals.RenterUID', uid);

//     // query
//     //     .then(rentals => {
//     //         return db(rentals).whereIn('Status', statuses);
//     //     })
    
//     const filterByStatuses = (statuses) => {
//         return (query) => query.whereIn('Rentals.Status', statuses);
//     }

//     const applyStatusFilter = filterByStatuses(statuses);

//     return applyStatusFilter(query);

// }