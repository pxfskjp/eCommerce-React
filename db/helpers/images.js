const db = require('../db.js');

module.exports = {
    addImage
}

function addImage(image) {
    return db('images')
        .insert(image)
        .returning('url')
        .then(urls => urls[0]);
}
