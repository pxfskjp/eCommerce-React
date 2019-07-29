const db = require('../db.js');

module.exports = {
    reserveDates,
    getRentalDates
}

function reserveDates(dateRange) {
    return db('reserved_dates')
        .insert(dateRange)
        .returning('id')
        .then(ids => ids[0]);
}

function getRentalDates(toolID) {
    return db
        .select([
            'Rentals.ReservedDatesID',
            'reserved_dates.start_date as startDate',
            'reserved_dates.end_date as endDate'
        ])
        .from('Rentals')
        .innerJoin('reserved_dates', 'Rentals.ReservedDatesID', 'reserved_dates.id')
        .where('Rentals.ToolID', toolId)
        .whereNot('Rentals.Status', 'cancelledByOwner')
        .whereNot('Rentals.Status', 'cancelledByRenter');
}

function getOwnerReservedDates(toolId) {
    return db
        .select([
            'start_date',
            'end_date'
        ])
        .from('reserved_dates')
        .where('tool_id', toolId)
        .where('res_type', 'owner');
}