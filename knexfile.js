// Database config settings

const dbConnection = process.env.DATABASE_URL || 'development';

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'camerontools',     
      password: 'toolshed',
      database: 'usemytoolsdev',
      charset: 'utf8'
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    useNullAsDefault: true
  },

  // test: {
  //   client: 'pg',
  //   connection:'postgres://localhost/<examples_test>',
  //   migrations: {
  //     directory: './db/migrations'
  //   },
  //   seeds: {
  //     directory: './db/seeds/test'
  //   },
  //   useNullAsDefault: true
  // },

  production: {
    client: 'pg',
    connection: dbConnection,
    pool: {
	    min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations',
    },
    seeds: { directory: './db/seeds' }
    // connection: process.env.DATABASE_URL,
    // migrations: {
    //   directory: './db/migrations'
    // },
    // seeds: {
    //   directory: './db/seeds/production'
    // },
    // useNullAsDefault: true
  }
};