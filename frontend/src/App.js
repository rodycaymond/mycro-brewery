import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import mycrobrewery_logo from './images/mycrobrewery_logo.png';
import './App.css';
import NavBar from './navBar.js';
import CreateRecipe from './createRecipe.js';
import ViewRecipes from './viewRecipes.js';
import Recipe from './recipe.js';
import Calculate from './calculate.js';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { json } from 'body-parser';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      recipes: [],
      recipeId: undefined
    }
    this.addRecipe = this.addRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.selectRecipe = this.selectRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
  }

  componentDidMount(){
    fetch('http://localhost:8080/')
    .then(res=>res.json())
    .then(data=>{
      this.setState({
        recipes: data,
        recipeId: this.state.recipeId
      })
      // console.log(this.state.recipes)
    })
  }

  selectRecipe(data){
    this.setState({
      recipes: this.state.recipes,
      recipeId: data
    })
  }
  addRecipe(data){
    let ingredients = data.ingredients.split(',').map(s=>s.replace(' ',''));
    console.log(data,ingredients)
    fetch('http://localhost:8080/addRecipe/',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipe: data,
        ingreds: ingredients
      }),
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      return fetch('http://localhost:8080')
    })
    .then(res=>res.json())
    .then(data=>{
      this.setState({
        recipes: data,
        recipeId: this.state.recipeId
      })
    })
    .then(()=>{
      // console.log(this.state.recipes)
      alert('Recipe Created!')
    })
    .catch(err=>console.log(err))
  }

  deleteRecipe(data){
    fetch(`http://localhost:8080/deleteRecipe/${data}`,{
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
    .then(data=>{
      // console.log('recipe deleted: ',data)
      return fetch('http://localhost:8080')
    })
    .then(res=>res.json())
    .then(newData=>{
      // console.log('new recipe data: ', newData)
      this.setState({
        recipes: newData,
        recipeId: this.state.recipeId
      })
    })
    .catch(err=>console.log(err))
  }
//****************EDIT RECIPES STILL NEEDS TO BE REFACTORED ON THE UI END AT EDIT TIME */
  editRecipe(data){
    let newRecipe = data.newRecipe;
    let oldRecipe = data.oldRecipe;
    let body = JSON.stringify({old: oldRecipe, new: newRecipe})
    fetch('http://localhost:8080/editRecipe', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body,
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      return fetch('http://localhost:8080/')
    })
    .then(res=>res.json())
    .then(data=>{
      this.setState({
        recipes: data,
        recipeId: this.state.recipeId
      })
    })
  };
    // let arr = this.state.recipes;
    // arr.splice(this.state.recipeId, 1, data.newRecipe);
    // this.setState({
    //   recipes: arr,
    //   recipeId: this.state.recipeId
    // })
    // console.log(this.state.recipes)
  

  render(){
    return (
      <Router>
        <div className="app-body">
          <div className="headline">
            <img className="app-title" src={mycrobrewery_logo} alt="logo"></img>
            <nav>
              <NavBar />
            </nav>
          </div>
            <div className="main-wrapper">
                <Route exact path="/" component={Home} />
                <Route exact path="/CreateRecipe" render={props=> <CreateRecipe action={this.addRecipe} state={this.state}/>}/>
                <Route exact path="/ViewRecipes" render={props=> <ViewRecipes recipes={this.state.recipes} select={this.selectRecipe} action={this.deleteRecipe}/>}/>
                <Route exact path={"/recipe/"+this.state.recipeId} render={props=> <Recipe state={this.state} action={this.deleteRecipe} edit={this.editRecipe}/>} />
                <Route exact path="/Calculate" component={Calculate}/>
            </div>
        </div>
      </Router>
    );
  }
}

function Home () {
  return (
  <div className="hometab">
    <h2>Welcome to MyCro Brewery!</h2>
    <p>To get started, click a tab above</p>
  </div>
  )
}

export default App;
