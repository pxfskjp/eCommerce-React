const server = require('./server');

const PORT = process.env.PORT || 3000;   // server will be hosted locally at localhost:3000

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});