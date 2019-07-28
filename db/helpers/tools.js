const db = require('../db.js');

module.exports = {
    createTool,
    getMyTools,
    getAllTools,
    getTool,
    getMyTool,
    deleteToolImages,
    deleteTool,
    updateToolDetails,
    findTools,
    createRental,
    getToolDataForRental
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

function getAllTools() {
    return db
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

function findTools(city) {
    return db
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
        .leftJoin('users', 'tools.owner_uid', 'users.uid')
        .where('users.city', city);
}

function getTool(id) {
    return db
        // .select('*')
        // .from('tools')
        // .where('id', id)
        // .first();
        .select([
            'tools.id',
            'tools.owner_uid as ownerUid',
            'tools.brand',
            'tools.name',
            'tools.description',
            'tools.price',
            'tools.available',
            'tools.rented',
            'tools.rating',
            'users.first_name as ownerFirstName',
            'users.last_name as ownerLastName',
            'users.city as ownerCity',
            'users.state as ownerState'
        ])
        .from('tools')
        .leftJoin('users', 'tools.owner_uid', 'users.uid')
        .where('tools.id', id)
        .first();
}

function getMyTool(id) {
    return db 
        .select([
            'tools.id',
            'tools.renter_uid as renterUid',
            'tools.brand',
            'tools.name',
            'tools.description',
            'tools.price',
            'tools.available',
            'tools.rented',
            'tools.rating',
            'users.first_name as renterFirstName',
            'users.last_name as renterLastName',
            'users.full_address as renterAddress'
        ])
        .from('tools')
        .leftJoin('users', 'tools.renter_uid', 'users.uid')
        .where('tools.id', id)
        .first();
}


function deleteToolImages(id) {
    return db('tool_images')
        .where('tool_id', id)
        .del();
}

function deleteTool(id) {
    return db('tools')
        .where('id', id)
        .del();
}

function updateToolDetails(id, tool) {
    return db('tools')
        .where('id', id)
        .update(tool);
}

function createRental(rental) {

}

function getToolDataForRental(toolID) {
    return db
        .select([
            'owner_uid',
            'price'
        ])
        .from('tools')
        .where('tools.id', toolID)
        .first();
}


