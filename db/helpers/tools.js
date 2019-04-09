const db = require('../db.js');

module.exports = {
    createTool
}

function createTool(newTool) {
    return db('tools')
        .insert(newTool)
        .returning('id')
        .then(ids => ids[0]);
}
