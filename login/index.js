const express = require('express');
const bcrypt = require('bcrypt');

const { generateToken } = require('../middleware/authenticate.js');
const db = require('../db/db.js');

const router = express.Router();

router.post('/', async (req, res) => {
    let { username, password } = req.body;

    if (!username) {
        res.status(400).json({message: 'No username provided.'});
        return;
    }
    if (!password) {
        res.status(400).json({message: 'No password provided.'});
        return;
    }
    
    try {
        // const user = await db.select('user.username', 'user.password', 'user.id', 'user.firstname', 'user.lastname', 'image.url as image_url')
        //     .from('users as user')
        //     .join('images as image', 'user.image_id', '=', 'image.id')
        //     .where('user.username', username)
        //     .first();
        const user_creds = await db.select('user.username', 'user.password')
            .from('users as user')
            .where('user.username', username)
            .first()
            
        if (user_creds) {
            password = bcrypt.hash(password, 1);
            // const password_match = await bcrypt.compare(password, user.password);
    
            if (password == user.password) {
                const token = generateToken(user_creds);
                res.status(200).json({
                    username: user.username,
                    token
                });
            }
        }
        res.status(401).json({message: 'Username and/or password was invalid.'});
    }
    catch (err) {
        res.status(500);
    }
});

module.exports = router;
