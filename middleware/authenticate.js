const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET || 'millertime';

const createToken = user => {      // take in a user ie { username, password } as argument

    const payload = {              
      subject: user.id,            // get the id of the user trying to register
      user: user                   //  get the full user data object
    }
  
    const options = {
      expiresIn: 60 * 60 * 24       // token expires after 24 hours
    }
  
    return new Promise((res, rej) => {
      jwt.sign(payload, jwtKey, options, (err, token) => {
        if (err)
          rej(err);
        else
          res(token);
      });
    });
}

const authenticate = (req, res, next) => {

    const token = req.get('Authorization');
  
    if (token) {
      jwt.verify(token, jwtKey, (err, decoded) => {
  
        if (err) {
          return res.status(401).json({message: 'You are not logged in.'});
        }
        req.decoded = decoded;
        next();
      });
  
    }
  
    else {
      res.status(401).json({
        message: 'Not authorized'
      });
    }
}
  
module.exports = {
  
    createToken,
    authenticate
  
}
  