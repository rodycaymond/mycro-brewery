
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes_ingredients').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('recipes_ingredients').insert([
        {recipe_id: 1, ingredient: '1 gallon water'},
        {recipe_id: 1, ingredient: '3lbs caramelized honey'},
        {recipe_id: 1, ingredient: '70g cinnamon sticks'},
        {recipe_id: 1, ingredient: '12oz maple syrup'},
        {recipe_id: 1, ingredient: '1 pack redstar yeast'}
      ]);
    });
};
