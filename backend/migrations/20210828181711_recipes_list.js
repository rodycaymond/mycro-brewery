
exports.up = function(knex) {
    return knex.schema.createTable('recipes_list', table=>{
        table.increments('recipe_id').primary();
        table.string('recipeName');
        table.string('recipeType');
        table.string('recipeTypeSpecific');
        table.string('initialVolume');
        table.string('finalVolume');
        table.string('startDate');
        table.string('endDate');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('recipes_list');
};
