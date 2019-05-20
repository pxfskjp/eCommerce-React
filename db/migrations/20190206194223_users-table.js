exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', table => {
            table.increments('id').primary();
            table.string('uid')    // Firebase uid
                .unique()
                .notNullable();
            table.string('email')
                .unique()
                .notNullable();
            table.string('first_name').notNullable();
            table.string('last_name').notNullable();
            table.string('street_address');
            table.string('street_number');
            table.string('street_name');
            table.string('city');
            table.string('county');
            table.string('state');
            table.string('country');
            table.string('zip_code');
            table.string('zip_code_ext');
            table.double('lat');
            table.double('lng');
            table.integer('image_id')
                .notNullable()
                .references('id')
                .inTable('images');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('users')
    ])
};