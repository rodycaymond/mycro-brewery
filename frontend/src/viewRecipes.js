import { createPath } from 'history';
import React, {useState} from 'react';
import { Link, Route, useHistory } from 'react-router-dom';

function ViewRecipes (props) {
    // console.log(props.recipes)
    return (
        <div className="inner-main">
            <RecipeList recipes={props.recipes} select={props.select} action={props.action}/>
        </div>
    );
}

function RecipeList(props){
    let recipeItems = props.recipes;
    let list = recipeItems.map((item,index)=>{
        return (
                <NewRecipe 
                select={props.select}
                action={props.action}
                key={index}
                id={index}
                recipe_id={item.recipe_id}
                rName={item.recipeName}
                rType={item.recipeType}
                sType={item.recipeTypeSpecific}
                ingredients={item.ingredients}
                initial={item.initialVolume}
                start={item.startDate}
                end={item.endDate}
                color={item.recipeType}
               />
        );
    });
    if (!recipeItems.length){
        return <div>No recipes have been created</div>
    } else {
        return (
            <div className="flex-recipes">
                {list}
            </div>
        )
    } 
}

function NewRecipe(props){
    const history = useHistory();

    let color;
    if (props.color==='Beer'){
        color = '#FAFAD2';
    } else if (props.color==='Mead'){
        color = '#FFD700';
    } else if (props.color==='Wine'){
        color = '#9370DB';
    } else if (props.color==='Kombucha'){
        color = '#90EE90';
    }
    let style = {
        backgroundColor: color
    }
    function handleDelete(){
        let bool = window.confirm('Are you sure you want to delete this recipe?');
            if (bool){
                props.action(props.recipe_id);
            }
            history.push('/ViewRecipes')
    }

    function handleId(){
        props.select(props.id);
    }
    return (
        <div className='recipePreview' style={style}>
            <button className="delete" onClick={handleDelete}>X</button>
            <Link className="no-dec"to={"/recipe/"+props.id} onClick={handleId} >
                <p>{props.rName}</p>
            </Link>
        </div>
    )
}

export default ViewRecipes;