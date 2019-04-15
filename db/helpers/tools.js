const db = require('../db.js');

module.exports = {
    createTool,
    getMyTools
}

function createTool(newTool) {
    return db('tools')
        .insert(newTool)
        .returning('id')
        .then(ids => ids[0]);
}

function getMyTools(uid) {
    return db('tools')
        .where('owner_uid', uid);
}
