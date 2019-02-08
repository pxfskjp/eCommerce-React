
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('images').del()
    .then(function () {
      // Inserts seed entries
      return knex('images').insert([
        {id: 1, url: 'https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png'}
      ]);
    });
};
