
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('tools', table => {
            table.increments('id').primary();           // id of the tool
            table.string('owner_uid')                   // id of the tool's owner
                .references('uid')                      // reference's owner's uid
                .inTable('users');
            table.integer('renter_uid');                  // id of the tool's current renter; a tool might be rented or it might be available
                // .references('id')                      // references the renter's uid
                // .inTable('users');
            table.string('brand');
            table.string('name').notNullable();
            table.string('description').notNullable();
            table.double('price')
                .notNullable()
                .defaultTo(0.0);                      // daily price to rent the tool
            table.boolean('available')
                .defaultTo(false);
            table.boolean('rented')
                .defaultTo(false);
            table.double('rating');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('tools')
    ])
};

