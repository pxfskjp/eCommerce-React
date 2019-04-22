const db = require('../db.js');

module.exports = {
    reserveDateRange
}

function reserveDateRange(dateRange) {
    return db('reserved_dates')
        .insert(dateRange)
        .returning('id')
        .then(ids => ids[0]);
}