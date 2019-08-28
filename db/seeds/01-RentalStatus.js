
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  
      // Inserts seed entries
      const query = knex('RentalStatus').insert([
        {RentalStatusID: 1, Status: 'upcoming'},
        {RentalStatusID: 2, Status: 'active'},
        {RentalStatusID: 3, Status: 'completed'},
        {RentalStatusID: 4, Status: 'cancelledByOwner'},
        {RentalStatusID: 5, Status: 'cancelledByRenter'},
        {RentalStatusID: 6, Status: 'pendingPayment'},
        {RentalStatusID: 7, Status: 'cancelledByAdmin'}
      ]);
      return knex.raw(`? ON CONFLICT DO NOTHING`, [query]).then(() => true);

};
