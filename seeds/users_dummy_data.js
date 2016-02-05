
exports.seed = function(knex, Promise) {
  return Promise.join(

    knex('users').del(),

    knex('users').insert({display_name: 'Joe Jackson'}),
    knex('users').insert({display_name: 'James Taylor'}),
    knex('users').insert({display_name: 'Taylor Swift'})

  );
};
