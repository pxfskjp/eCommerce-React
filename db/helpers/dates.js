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
            'reserved_dates.start_date as startDate',
            'reserved_dates.end_date as endDate',
            'Rentals.ReservedDatesID',
        ])
        .from('reserved_dates')
        .innerJoin('Rentals', 'Rentals.ReservedDatesID', 'reserved_dates.id')
        .where('Rentals.ToolID', tool_id)
        .where('Rentals.Status', '!==', 'cancelled');
}