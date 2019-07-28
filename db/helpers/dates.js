const db = require('../db.js');

module.exports = {
    reserveDates,
    getReservedDates
}

function reserveDates(dateRange) {
    return db('reserved_dates')
        .insert(dateRange)
        .returning('id')
        .then(ids => ids[0]);
}

function getReservedDates(tool_id) {
    return db
        .select([
            'Rentals.ReservedDatesID',
            'reserved_dates.start_date as startDate',
            'reserved_dates.end_date as endDate'
        ])
        .from('Rentals')
        .innerJoin('reserved_dates', 'Rentals.ReservedDatesID', 'reserved_dates.id')
        .where('Rentals.ToolID', tool_id)
        .whereNot('Rentals.Status', 'cancelledByOwner')
        .whereNot('Rentals.Status', 'cancelledByRenter');
}