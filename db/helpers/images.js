const db = require('../db.js');

module.exports = {
    addImage,
    addToolImage,
    getToolImages,
    updateImage,
    getFirstToolImage
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

function getToolImages(id) {
    return db
        .select('i.url')
        .from('tool_images as ti')
        .join('images as i', 'ti.image_id', 'i.id')
        .where({tool_id: id});
}

function getFirstToolImage(toolId) {
    return db
        .select('i.url')
        .from('tool_images as ti')
        .join('images as i', 'ti.image_id', 'i.id')
        .where({tool_id: toolId})
        .first();
}

function updateImage(id, url) {
    return db('images')
        .where({ id: Number(id) })
        .update({ url: url });
}
