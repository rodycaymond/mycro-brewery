import React, {useState} from 'react';

function CreateRecipe (props) {
    function handleRecipeCreate(){
        if (!recipeName ||
            !recipeType ||
            !recipeTypeSpecific ||
            !ingredients ||
            !initialVolume ||
            !startDate ||
            !endDate){
                alert('Please fill out the form completely before submitting');
            } else {
                props.action({
                    recipeName: recipeName,
                    recipeType: recipeType,
                    recipeTypeSpecific: recipeTypeSpecific,
                    ingredients: ingredients,
                    initialVolume: initialVolume,
                    finalVolume: '',
                    startDate: startDate,
                    endDate: endDate
                  })
            }
    }

    const [recipeName, setRecipeName] = useState('');
    const [recipeType, setRecipeType] = useState('');
    const [recipeTypeSpecific, setRecipeTypeSpecific] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [initialVolume, setInitialVolume] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    return (
        <div className="inner-main">
            <div>
                <form>
                <h3 className="recipe-button" onClick={handleRecipeCreate} type="submit">Add Recipe +</h3>
                    <fieldset>
                        <legend>Brew It!</legend>
                        <div className="form-section">
                            <label htmlFor="recipe-name">Recipe Name: </label>
                            <input name="recipe-name" onChange={(event)=>setRecipeName(event.target.value)} value={recipeName}></input>
                        </div>
                        <div className="form-section">
                            <label htmlFor="selection">Brew Type: </label>
                            <select value={recipeType} name="selection" onChange={(event)=>setRecipeType(event.target.value)}>
                                <option></option>
                                <option>Beer</option>
                                <option>Wine</option>
                                <option>Mead</option>
                                <option>Kombucha</option>
                            </select>
                            <br></br><br></br>
                            <label htmlFor="recipe-type">Recipe Type Specfic: </label>
                            <input name="recipe-type" placeholder="Ex: Port Wine, Melomel, Belgian-Style"
                            onChange={(event)=>setRecipeTypeSpecific(event.target.value)} value={recipeTypeSpecific}></input>
                        </div>
                        <div className="form-section">
                            <label htmlFor="ingredients">Ingredients: </label>
                            <input name="ingredients" onChange={(event)=>setIngredients(event.target.value)} value={ingredients}></input>
                        </div>
                        <div className="form-section">
                            <label htmlFor="initial">Initial Potential Volume: </label>
                            <input name="initial" onChange={(event)=>setInitialVolume(event.target.value)} value={initialVolume}></input>
                        </div>
                        <div className="form-section">
                            <p className="underline">Brew Dates</p>
                            <label htmlFor="start">Start: </label>
                            <input name="start" onChange={(event)=>setStartDate(event.target.value)} value={startDate}></input><br></br><br></br>
                            <label htmlFor="end">End: </label>
                            <input name="end" placeholder="projected - can later be changed"
                            onChange={(event)=>setEndDate(event.target.value)} value={endDate}></input>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default CreateRecipe;