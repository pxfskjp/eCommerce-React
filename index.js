const server = require('./server.js');

const PORT = process.env.PORT || 5000;   // in development server will be hosted locally at localhost:5000

server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
