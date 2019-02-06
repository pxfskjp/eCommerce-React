
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('tools', table => {
            table.increments('id').primary();           // id of the tool
            table.integer('owner_id')                   // id of the tool's owner
                .notNullable()                          // every tool has an owner
                .references('uid')                      // reference's owner's uid
                .inTable('users');
            table.integer('renter_id')                  // id of the tool's current renter; a tool might be rented or it might be available
                .references('uid')                      // references the renter's uid
                .inTable('users');
            table.string('brand');
            table.string('name').notNullable();
            table.string('description').notNullable();
            table.double('price').notNullable();
            table.string('home_street_address');
            table.string('current_street_address');
            table.boolean('available').notNullable();
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

// **** After this migration I'm attempting to use Postico