
exports.up = function(knex, Promise) {
  return knex.schema.table('bucketlist', function(t){
    t.string('lowertitle')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('bucketlist', function(t){
    t.dropColumn('lowertitle')
  })
};
