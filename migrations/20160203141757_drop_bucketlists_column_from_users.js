
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.dropColumn('bucketlists')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t){
    table.json('bucketlists')
  });
};
