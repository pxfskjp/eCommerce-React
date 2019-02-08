const express = require('express');
const bcrypt = require('bcrypt');

// *** TO DO ***
// DONE create an auth folder with auth middleware/helper functions 
// DONE generate an auth token in this file
// DONE import/require db confit (db.js) filepath


const { generateToken } = require('../middleware/authenticate.js');
const db = require('../db/db.js');

const server = express.Router();

server.post('/', async (req, res) => {
    let { username, password, email, image_id, firstname, lastname } = req.body;

    // Error checking for missing required fields
    if (!username) {
        res.status(400).json({message: 'no username provided'});
        return;
    }
    if (!password) {
        res.status(400).json({message: 'no password provided'});
        return;
    }
    if (!firstname) {
        res.status(400).json({message: 'no first name provided'});
        return;
    }
    if (!lastname) {
        res.status(400).json({message: 'no last name provided'});
        return;
    }
    if (!email) {
        res.status(400).json({message: 'no email provided'});
        return;
    }
    if (!image_id) {
        image_id = 1;   // set user image to default image
    }
    
    try {
        password = await bcrypt.hash(password, 1);
    
        await db
            .insert({ username, password, email, image_id, firstname, lastname })
            .into('users')
            .then(user => {
                console.log(user);
                res.status(200).json(user);
            })
            .catch(err => {
                console.log("error inserting user into db");
                res.status(500).json(err)
            });

        const user = await db.select('user.username', 'user.id', 'user.firstname', 'user.lastname', 'image.url as image_url')
            .from('users as user')
            .join('images as image', 'user.image_id', '=', 'image.id')   // link the user's image_id to the matching id in images table
            .where('user.username', username)
            .first();
        console.log(user);
        const token = await generateToken(user);
        console.log(token);
        res.status(201).json({
          username: user.username,
          user_id: user.id,
          image_url: user.image_url,
          firstname: user.firstname,
          lastname: user.lastname,
          token
        });
    }
    
      catch (err) {
    
        const existingUsername = await db.select()
            .from('users')
            .where({ username })
            .first();
        const existingEmail = await db.select()
            .from('users')
            .where({ email })
            .first();
    
        if (existingUsername || existingEmail) {
            res.status(400)
                .json({
                    message: 'Duplicate name or email.', 
                    duplicateUser: withName !== undefined, 
                    duplicateEmail: withEmail !== undefined
                });
        }
    
        else {
          res.status(500).json({message: 'Internal server error'});
        }
      }
});
    
server.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username) {
        res.status(400).json({message: 'You must provide a username.'});
        return;
    }
    
    if (!password) {
        res.status(400).json({message: 'You must provide a password.'});
        return;
    }
    
    try {
        const user = await db.select('user.username', 'user.password', 'user.id', 'user.firstname', 'user.lastname', 'image.url as image_url')
            .from('users as user')
            .join('images as image', 'user.image_id', '=', 'image.id')
            .where('u.username', username)
            .first();
    
        if (user) {
          const password_match = await bcrypt.compare(password, user.password);
    
          if (password_match) {
            const token = await generateToken(user);
    
            res.status(200).json({
              user_id: user.id,
              username: user.username,
              image_url: user.image_url,
              firstname: user.firstname,
              lastname: user.lastname,
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

module.exports = server;


