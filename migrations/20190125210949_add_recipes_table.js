
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipes', function(table) {
    table.increments('id')
    table.string('name')
    table.jsonb('ingredients')
    table.jsonb('directions')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recipes')
};
