
exports.up = function(knex) {
  return knex.schema.createTable('recipes_ingredients', table=>{
      table.integer('recipe_id');
      table.string('ingredient');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('recipes_ingredients');
};
