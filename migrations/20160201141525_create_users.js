
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('fb_id');
    table.string('display_name');
    table.json('lists');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
