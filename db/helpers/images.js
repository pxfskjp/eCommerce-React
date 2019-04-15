const db = require('../db.js');

module.exports = {
    addImage,
    addToolImage
}

// add image url to images table:
function addImage(image) {
    return db('images')
        .insert(image)
        .returning('id')
        .then(ids => ids[0]);
}

// add tool_id and image_id pair to tool-images table
function addToolImage(image) {
    return db('tool_images')
        .insert(image)
        .returning('tool_id')
        .then(ids => ids[0]);
}
