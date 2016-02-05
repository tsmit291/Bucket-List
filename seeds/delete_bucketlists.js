
exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('bucketlist').del()
  );
};
