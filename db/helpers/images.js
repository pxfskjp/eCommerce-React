const db = require('../db.js');

module.exports = {
    addImage
}

function addImage(image) {
    return db('images')
        .insert(image)
        .returning('id')
        .then(ids => ids[0]);
}
