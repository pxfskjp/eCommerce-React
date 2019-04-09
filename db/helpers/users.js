const db = require('../db.js');

module.exports = {
    createUser,
    getUserInfo
}

function createUser(newUser) {
    return db('users')
        .insert(newUser)
        .returning('id')
        .then(ids => ids[0]);
}

function getUserInfo(uid) {
    return db('users').where('uid', uid)
        .then(users => {
            return users[0];
        });
}