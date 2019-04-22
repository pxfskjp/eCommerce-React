const db = require('../db.js');

module.exports = {
    createTool,
    getMyTools,
    getAllTools,
    getTool
}

function createTool(newTool) {
    return db('tools')
        .insert(newTool)
        .returning('id')
        .then(ids => ids[0]);
}

// function getMyTools(uid) {
//     return db
//         .select('*')
//         .from('tools')
//         .innerJoin('tool_images', 'tools.id', 'tool_images.tool_id')
//         .innerJoin('images', 'tool_images.image_id' ,'images.id')
//         .where('tools.owner_uid', uid);
// }

function getMyTools(uid) {
    return db
        .select('*')
        .from('tools')
        .where('tools.owner_uid', uid);
}

function getAllTools(uid) {
    return db
        .select('*')
        .from('tools');
}

function getTool(id) {
    return db
        .select('*')
        .from('tools')
        .where('id', id);
}


