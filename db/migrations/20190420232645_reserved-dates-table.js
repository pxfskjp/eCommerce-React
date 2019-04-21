exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('reserved_dates', table => {
            table.increments('id').primary();
            table.integer('tool_id')
                .references('id')
                .inTable('tools');
            table.string('res_type')    // res_type will be either 'rental' or 'owner_block'
                .notNullable();
            table.string('renter_uid');  // if reservation is for a rental (not an owner block) there needs to be a renter_uid
            table.date('start_date')
                .notNullable();
            table.date('end_date')
                .notNullable();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('reserved_dates')
    ])
};