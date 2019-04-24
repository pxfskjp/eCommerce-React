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
    return db('reserved_dates')
        .select([
            'start_date as startDate',
            'end_date as endDate'
        ])
        .where('tool_id', tool_id);
}