
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('tool_images', table => {
            table.integer('tool_id')
                .notNullable()
                .references('id')
                .inTable('tools');
            table.integer('image_id')
                .notNullable()
                .references('id')
                .inTable('images');
        
            table.primary(['tool_id', 'image_id']);   // primary key is a combination of tool_id and image_id
        })
    ])
    
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('tool_images')
    ])
};
