
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', table => {
            table.increments('uid').primary();
            table.string('username').unique().notNullable();
            table.string('password').notNullable();
            table.string('email').unique().notNullable();
            table.string('firstname').notNullable();
            table.string('lastname').notNullable();
            table.string('street_address');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfEsists('users')
    ])
};

