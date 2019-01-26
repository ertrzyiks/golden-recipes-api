
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipes', function(table) {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('slug').notNullable().unique()
    table.jsonb('ingredients').notNullable()
    table.jsonb('directions').notNullable()
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recipes')
};
