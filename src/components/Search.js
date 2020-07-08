import React from 'react'
import RecipeTile from'./RecipeTile'
import Recipe from './Recipe'
class Search extends React.Component
{

    constructor(props)
    {
        super(props)
        this.state = { meals: [],
                        clicked: false}
        this.handleChange  = this.handleChange.bind(this)
        this.callBackFromChild = this.callBackFromChild.bind(this)
        this.back = this.back.bind(this)

    }


    componentDidMount()
    {
        fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef")
        .then(response => response.json())
        .then(data => {
            this.setState({meals: data.meals})
            
        })
    }

    handleChange(e)
    {
       

        //api call
        fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c="+e.target.value)
        .then(response => response.json())
        .then(data => {
            this.setState({meals: data.meals})
            
        })

    }

   callBackFromChild (data)
   {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+data)
    .then(response => response.json())
    .then(data => {
        var keyNames = Object.keys(data.meals[0]);
        var ingredientsKeys = keyNames.slice(9,29);
        var innerIng = []
        
        var inst =  data.meals[0].strInstructions.split(".")
        var joined = inst.join(". \n")
        for(var i = 0; i<ingredientsKeys.length; i++)
        {
            if(data.meals[0][ingredientsKeys[i]] !== "" && data.meals[0][ingredientsKeys[i]] !== null )
            {
                innerIng.push(data.meals[0][ingredientsKeys[i]])
            }
        }

        var measuresKeys = keyNames.slice(29,49)
        var innerMes = []
        for(var j = 0; j<measuresKeys.length; j++)
        {
            if(data.meals[0][measuresKeys[j]] !== "" && data.meals[0][measuresKeys[j]] !== null )
            {
                innerMes.push(data.meals[0][measuresKeys[j]])
            }
        }
        this.setState( (prevState) => 
        {
            return{ meals: prevState.meals, 
                  clicked:true, 
                  name: data.meals[0].strMeal,
                  category: data.meals[0].strCategory,
                  area: data.meals[0].strArea,
                  instructions: joined,
                  image: data.meals[0].strMealThumb,
                  ingredients: innerIng,
                  measures: innerMes
                  }
        })
    })
    }

    
    back()
    {
        this.setState( prevState => {
            return{
                meals: prevState.meals, 
                clicked:false 
            }
        })
    }

    
 
    spanStyle = {marginRight: 5}

    render()
    {
        

       const categories = this.props.categories.map( cat => <option key={cat.id}>{cat.category}</option >)

       const meals = this.state.meals.map( meal => <RecipeTile
                                                    className="tile"
                                                    key={meal.idMeal}
                                                    image={meal.strMealThumb}
                                                    name={meal.strMeal}
                                                    sendToParent={this.callBackFromChild}/>)
      if(!this.state.clicked)
      {return(
         <div>
             <div className="search">
             <span style={this.spanStyle}>Category:</span>
             <select onChange={this.handleChange} className="dropdown">
              {categories}
          </select>
             </div>

           <div className="tiles">{meals}</div>

          </div>
      )
    }
    else{
        return(<div className="mainRecipe">
                <Recipe
                ingredients={this.state.ingredients}
                measures={this.state.measures}
                name={this.state.name}
                instructions={this.state.instructions}
                image={this.state.image}
                back={this.back}/>
                </div>)
    }
    }
}

export default Search   