
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('Rentals', table => {
            table.increments('RentalID').primary();
            table.string('RenterUID')   // FK ref to tool renter's uid
                .references('uid')
                .inTable('users');
            table.string('OwnerUID')    // FK ref to the tool owner's uid; potentially redundant but useful for easy querying
                .references('uid')
                .inTable('users');
            table.integer('ToolID')  // FK ref to the tool being rented
                .references('id')
                .inTable('tools');
            table.integer('ReservedDatesID') // FK ref to entry in reserved_dates table (which includes start_date and end_date)
                .references('id')
                .inTable('reserved_dates');
            table.string('Status')
                .references('Status')
                .inTable('RentalStatus');
            table.double('DailyRentalPrice')   // Price when rental is created. No FK ref to tool price b/c owner could change price after rental is created
                .notNullable();
            table.date('CreateDate')            // Date when rental is created
                .notNullable();
            table.date('CancelDate');           // Date when rental is cancelled *if* rental is cancelled 
            table.integer('ratingFromRenter');  // 1-5 star rating
            table.string('reviewFromRenter');
            table.integer('ratingFromOwner');   // 1-5 star rating
            table.string('reviewFromOwner');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('Rentals')
    ])
};
