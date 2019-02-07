exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', table => {
            table.increments('id').primary();
            table.string('username')
                .unique()
                .notNullable();
            table.string('password').notNullable();
            table.string('email')
                .unique()
                .notNullable();
            table.string('firstname').notNullable();
            table.string('lastname').notNullable();
            table.string('home_street_address');
            table.double('home_lat');
            table.double('home_lon');
            table.integer('image_id')
                .notNullable()
                .references('id')
                .inTable('images');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfEsists('users')
    ])
};