
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', table => {
            table.increments('uid').primary();
            table.string('username').unique().notNullable();
            table.string('password').notNullable();
            table.string('email').unique().notNullable();
            tbl.string('firstname').notNullable();
            tbl.string('lastname').notNullable();
            tbl.string('street_address');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfEsists('users')
    ])
};

