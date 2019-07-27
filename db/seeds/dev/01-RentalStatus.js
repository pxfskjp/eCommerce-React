
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('RentalStatus').del()
    .then(function () {
      // Inserts seed entries
      return knex('RentalStatus').insert([
        {RentalStatusID: 1, Status: 'upcoming'},
        {RentalStatusID: 2, Status: 'active'},
        {RentalStatusID: 3, Status: 'completed'},
        {RentalStatusID: 4, Status: 'cancelledByOwner'},
        {RentalStatusID: 5, Status: 'cancelledByRenter'}
      ]);
    });
};
