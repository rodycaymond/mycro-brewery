
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes_list').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('recipes_list').insert([
        {
          recipeName: 'Campfire Mead',
          recipeType: 'Mead',
          recipeTypeSpecific: 'Bochetomel',
          initialVolume: '1.100',
          finalVolume: '',
          startDate: '3 months ago',
          endDate: 'today'  
        }
      ]);
    });
};
