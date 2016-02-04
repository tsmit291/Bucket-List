
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('fb_id');
    table.string('display_name');
    table.boolean('auth');
    table.string('email');
    table.string('password');
    table.text('bio');
    table.string('picture');
    table.json('bucketlists');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
