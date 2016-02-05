
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bucketlist', function(t){
      t.increments()
      t.integer('user_id')
      t.string('title')
      t.string('picture')
      t.string('description')
      t.string('resourceUrlA')
      t.string('resourceA')
      t.string('resourceUrlB')
      t.string('resourceB')
      t.string('resourceUrlC')
      t.string('resourceC')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bucketlists')
};
