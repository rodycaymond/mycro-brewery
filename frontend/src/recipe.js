import React, {useState,useEffect, useRef} from 'react';
import { Link, Route, useHistory } from 'react-router-dom';

function Recipe (props) {
    const history = useHistory();
    let id = props.state.recipeId;
    let recipe = props.state.recipes[id];
    const [name, setName] = useState(recipe.recipeName);
    const [type, setType] = useState(recipe.recipeType);
    const [specific, setSpecific] = useState(recipe.recipeTypeSpecific);
    const [ingred, setIngred] = useState([]);
    const [initial, setInitial] = useState(recipe.initialVolume);
    const [final, setFinal] = useState(recipe.finalVolume);
    const [start, setStart] = useState(recipe.startDate);
    const [end, setEnd] = useState(recipe.endDate);
    const [edit, setEdit] = useState('Edit');
    const [hidden, setHidden] = useState({display: 'none'});
    const changeIngreds = useRef();

    useEffect(()=>{
        fetch(`http://localhost:8080/ingredients/${recipe.recipe_id}`)
        .then(res=>res.json())
        .then(data=>{
            let ingredients = data.map(item=>{
                return item.ingredient;
            })
            setIngred(ingredients);
        })
    },[recipe]);

    let color;
    if (recipe.recipeType==='Beer'){
        color = '#FAFAD2';
    } else if (recipe.recipeType==='Mead'){
        color = '#FFD700';
    } else if (recipe.recipeType==='Wine'){
        color = '#9370DB';
    } else if (recipe.recipeType==='Kombucha'){
        color = '#90EE90';
    }
    let style = {
        backgroundColor: color
    }
    function handleDelete(){
        let bool = window.confirm('Are you sure you want to delete this recipe?');
        if (bool){
            props.action(recipe.recipe_id);
        }
        history.push('/ViewRecipes');
    }
    function handleHide(){
        if (hidden.display === 'none'){
            setHidden({display: 'initial'});
            setEdit('Save');
        } else {
            setHidden({display: 'none'});
            setEdit('Edit');
            props.edit({
                newRecipe: {
                    recipe_id: recipe.recipe_id,
                    recipeName: name,
                    recipeType: type,
                    recipeTypeSpecific: specific,
                    ingredients: changeIngreds === undefined ? ingred : changeIngreds.current.value.split(',').map(s=>s.replace(' ', '')),
                    initialVolume: initial,
                    finalVolume: final,
                    startDate: start,
                    endDate: end,
                },
                oldRecipe: recipe
              })
        }
    }
    
    return (
        <div className="recipe-tab-outer" style={style}>
            <button className="delete" onClick={handleDelete}>X</button>
            <button onClick={handleHide}>{edit}</button>
            <div className="new-recipe-tab">
                <div className="side">
                    <h3>Recipe Name</h3>
                    <p>{name}</p>
                    <input placeholder="new name" onChange={(event)=>setName(event.target.value)} style={hidden}></input>
                    <h4>Recipe Type</h4>
                    <p>{type}</p>
                    <select value={type} name="selection" onChange={(event)=>setType(event.target.value)} style={hidden}>
                        <option></option>
                        <option>Beer</option>
                        <option>Wine</option>
                        <option>Mead</option>
                        <option>Kombucha</option>
                    </select>
                    <p>{specific}</p>
                    <input placeholder="new specific type" onChange={(event)=>setSpecific(event.target.value)} style={hidden}></input>
                    <h4>Ingredients</h4>
                    <p>{ingred.map(item=>{return <li>{item}</li>})}</p>
                    <input placeholder="comma separated list..." ref={changeIngreds} style={hidden} className="comma"></input>
                </div>
                <div className="side">
                    <h4>Initial Volume/Potential</h4>
                    <p>{initial}</p>
                    <input placeholder="new initial gravity" onChange={(event)=>setInitial(event.target.value)} style={hidden}></input>
                    <h4 id="normal-font">Final Volume/Gravity</h4>
                    <p>{final}</p>
                    <input placeholder="new final gravity" onChange={(event)=>setFinal(event.target.value)} style={hidden}></input>
                    <h4>Start Date</h4>
                    <p>{start}</p>
                    <input placeholder="new start date" onChange={(event)=>setStart(event.target.value)} style={hidden}></input>
                    <h4>End Date</h4>
                    <p>{end}</p>
                    <input placeholder="new end date" onChange={(event)=>setEnd(event.target.value)} style={hidden}></input>
                </div>
            </div>
        </div>
    )
}

export default Recipe;