
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('users', table => {
            table.string('stripe_customer_id');
        })
    ]); 
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('users', table => {
            table.dropColumn('stripe_customer_id');
        })
    ]);
};
