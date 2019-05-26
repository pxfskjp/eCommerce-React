const db = require('../db.js');

module.exports = {
    createTool,
    getMyTools,
    getAllTools,
    getTool,
    getMyTool
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
        // .select('*')
        // .from('tools');
        .select([
            'tools.id',
            'tools.brand',
            'tools.name',
            'tools.description',
            'tools.price',
            'tools.available',
            'tools.rented',
            'tools.rating',
            'users.first_name as ownerFirstName',
            'users.full_address',
            'users.city',
            'users.state'
        ])
        .from('tools')
        .leftJoin('users', 'tools.owner_uid', 'users.uid');
}

function getTool(id) {
    return db
        .select('*')
        .from('tools')
        .where('id', id)
        .first();
}

function getMyTool(id) {
    return db 
        .select([
            'tools.renter_uid as renterUid',
            'tools.brand',
            'tools.name',
            'tools.description',
            'tools.price',
            'tools.available',
            'tools.rented',
            'tools.rating',
            'users.firstname as renterFirstName',
            'users.lastname as renterLastName',
            'users.home_street_address as renterAddress'
        ])
        .from('tools')
        .leftJoin('users', 'tools.renter_uid', 'users.uid')
        .where('tools.id', id)
        .first();
}




