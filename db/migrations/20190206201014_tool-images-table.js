// 
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
        
            table.primary(['tool_id', 'image_id']);   // primary key is a composite of tool_id and image_id
                                                      //  syntax: table.primary(columns, [constraintName]) where constraint name defaults to `tablename_pkey`
        })
    ])
    
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('tool_images')
    ])
};
