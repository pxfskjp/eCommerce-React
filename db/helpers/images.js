const db = require('../db.js');

module.exports = {
    addImage,
    addToolImage
}

function addImage(image) {
    return db('images')
        .insert(image)
        .returning('id')
        .then(ids => ids[0]);
}

function addToolImage(image) {
    return db('tool_images')
        .insert(image)
        .returning('tool_id')
        .then(ids => ids[0]);
}
