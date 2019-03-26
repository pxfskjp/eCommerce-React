const server = require('./server.js');

const PORT = process.env.PORT || 3000;   // server will be hosted locally at localhost:3000


const registerRoutes = require('./api/register');

app.use('/api/register', registerRoutes);


server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
