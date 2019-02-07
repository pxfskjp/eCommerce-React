
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('images', table => {
            table.increments('id').primary();           // unique id of the image
            
            table.string('url').notNullable();          // url of the image from cloudinary
        })
    ])
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('images');
};
