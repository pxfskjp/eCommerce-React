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



