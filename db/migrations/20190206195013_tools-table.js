
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('tools', table => {
            table.increments('id').primary();           // id of the tool
            table.integer('owner_id')                   // id of the tool's owner
                .notNullable()                          // every tool has an owner
                .references('id')                      // reference's owner's uid
                .inTable('users');
            table.integer('renter_id');                  // id of the tool's current renter; a tool might be rented or it might be available
                // .references('id')                      // references the renter's uid
                // .inTable('users');
            table.string('brand');
            table.string('name').notNullable();
            table.string('description').notNullable();
            table.double('price')
                .notNullable()
                .defaultTo(0.0);                      // daily price to rent the tool
            table.string('home_street_address');      // home address of the owner
            table.string('current_street_address');   // adress of current renter
            table.double('home_lat');
            table.double('home_lon');
            table.double('current_lat');
            table.double('current_lon');
            table.boolean('available')
                .defaultTo(false);
            table.double('rating');
            table.double('owner_rating');
        })
    ])
};
// about to run create tools table migration
exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfEsists('tools')
    ])
};

