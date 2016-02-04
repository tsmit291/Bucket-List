
exports.seed = function(knex, Promise) {
  return Promise.join(

    knex('users').del(),

    knex('users').insert({id: 1, display_name: 'Joe Jackson'}),
    knex('users').insert({id: 2, display_name: 'James Taylor'}),
    knex('users').insert({id: 3, display_name: 'Taylor Swift'})

  );
};
