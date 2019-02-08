const server = require('./server.js');

const PORT = process.env.PORT || 3000;   // server will be hosted locally at localhost:3000

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
// ******

// const server = require('./server');
// // const env = require('dotenv').config({path: './.env'});

// const port = process.env.PORT || 3000;

// server.listen(port, () => console.log(`Server live on port ${port}`));
