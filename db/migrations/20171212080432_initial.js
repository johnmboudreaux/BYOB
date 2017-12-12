
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('home_owner', (table) => {
      table.increments('id').primary();
      table.string('firstName');
      table.string('lastName');
      table.string('streetAddress');
      table.integer('zipCode');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('homes', (table) => {
      table.increments('id').primary();
      table.string('houseName').unique();
      table.string('houseAddress');
      table.string('description');
      table.integer('bathrooms').unsigned();
      table.integer('bedrooms').unsigned();
      table.integer('zipCode').unsigned();
      table.integer('ownerId').unsigned();
      table.foreign('ownerId').references('home_owner.id');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('homes'),
    knex.schema.dropTable('home_owner')
  ]);
};
