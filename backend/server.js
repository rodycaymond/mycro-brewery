const express = require('express');
const cors = require('cors');
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants');
const app = express();
const port = 8080;

const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', function(req, res){
  knex
    .select('*')
    .from('recipes_list')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json(err)
    );
})

app.get('/ingredients/:id', (req,res)=>{
  knex
    .select('*')
    .from('recipes_ingredients')
    .where('recipe_id', req.params.id)
    .then(data=>res.status(200).json(data))
    .catch(err=>{
      res.status(404).json(err)
    })
})

//you still need to test the addRecipe function to make sure the database receives the edits
app.post('/addRecipe', function(req, res){
  console.log(req.body)
  knex('recipes_list')
  .insert(
    {recipeName: req.body.recipe.recipeName,
    recipeType: req.body.recipe.recipeType,
    recipeTypeSpecific: req.body.recipe.recipeTypeSpecific,
    initialVolume: req.body.recipe.initialVolume,
    finalVolume: req.body.recipe.finalVolume,
    startDate: req.body.recipe.startDate,
    endDate: req.body.recipe.endDate}
  )
  .then(async()=>{
    const maxId = await knex('recipes_list').max('recipe_id');
    let ingredients = req.body.ingreds.map(item=>{
      return {recipe_id: maxId[0].max, ingredient: item}
    })
    console.log(ingredients)
    knex('recipes_ingredients')
    .insert(ingredients)
    .then(data=>res.status(200).json(data))
  })
  .catch(err=>res.status(404).json(err))
})

app.post('/editRecipe', function(req,res){
  let changes = req.body.new;
  knex('recipes_list')
  .where('recipe_id', changes.recipe_id)
  .update({
    recipeName: changes.recipeName,
    recipeType: changes.recipeType,
    recipeTypeSpecific: changes.recipeTypeSpecific,
    initialVolume: changes.initialVolume,
    finalVolume: changes.finalVolume,
    startDate: changes.startDate,
    endDate: changes.endDate
  })
  .then(()=>{
    knex('recipes_ingredients')
    .where('recipe_id', changes.recipe_id)
    .del()
      .then(()=>{
        let ingredients = changes.ingredients.map(item=>{
          return {recipe_id: changes.recipe_id, ingredient: item}
        })
        knex('recipes_ingredients')
        .insert(ingredients)
        .then(data=>{
          res.status(200).json(data)
        })
        .catch(err=>res.status(404).json(err))
      })
  })
})

app.delete('/deleteRecipe/:id', (req,res)=>{
  knex('recipes_list')
  .where('recipe_id', req.params.id)
  .del()
  .then(()=>{
    knex('recipes_ingredients')
    .where('recipe_id', req.params.id)
    .del()
    .then(res=>{
      console.log(res)
      res.status(200).json(res)
    })
    .catch(err=>res.status(404).json(err))
  })
  
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})