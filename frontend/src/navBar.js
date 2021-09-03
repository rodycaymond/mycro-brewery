import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function NavBar (props){

    let navNames = ['/CreateRecipe', '/ViewRecipes', '/Calculate'];
    let navText = ['Create Recipe', 'View Recipes', 'Calculate']
    let list = navNames.map((item,index)=>{
        return <NavBarItem key={index} text={navText[index]} links={item} />
    })
    return <div className="list" >{list}</div>;
}

function NavBarItem(props){

    return <Link className="navLink" to={props.links}>{props.text}</Link>
    
}

export default NavBar;