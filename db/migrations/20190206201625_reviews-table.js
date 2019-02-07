
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('reviews', table => {
            table.increments('id').primary();
            table.integer('reviewer_id')
                .references('id')
                .inTable('users');
            table.integer('reviewed_id')
                .references('id')
                .inTable('users');
            table.integer('star_rating').notNullable();
            table.string('content');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfEsists('reviews')
    ])
};

