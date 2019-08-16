# Use-My-Tools-CSR
Use My Tools is a rental marketplace web app where individuals can find and rent tools owned by people nearby. It's a great way to save money when you need a tool for one project and it's not worth buying one.

The root directory contains backend (server and database) code as well as the use-my-tools React App, which contains the front end (client app) code.

Backend Server:

The backend server is built with express and node.js. The code for API endpoints is contained in the 'api' folder, organized into folders for rentals, tools, and users.

Database:

The app uses a Postgres SQL database with migrations and database queries built using the knex.js library. The file named 'knexfile.js' located in the root directory holds the knex configruation information. The folder named 'db' contains code for the database, with the following sub-folders:

- 'db/helpers/' contains helper functions used to perform operations and queries on the database.
- 'db/migrations' contains the knex migration files used to construct the database table schemas.
- 'db/seeds' contains database seed files. 
- The file 'db.js' located at filepath '/db/db.js' imports the knex config file used by the database. 

How to run the app in a development environment:
1) Fork and/or clone the repository.

2) Install dependencies:
    - from the root directory run the command `npm install`

3) Create a local Postgres database, making sure that the username under which you create the db, the password, and the name of the db match the corresponding values in the knex.js found in the root directory.

4) Run database migrations to create the tables in the postgres db:
    - From the root directory, run the command `knex migrate:latest`

5) Run database seed files:
    - From the root directory, run the command `knex seed:run`

6) Start the backend server:
    - From the root directory run command `node index.js`

7) Start the frontend (client) server:
    - cd into the use-my-tools directory by running `cd use-my-tools` from the root directory
    - run the command `npm start`


