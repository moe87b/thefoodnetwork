import React from 'react'

class Recipe extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
                name: "",
                category: "",
                area:"",
                instructions:"",
                image:"",
                ingredients : [],
                measures :[]
        }

       
    }

  

    render()
    {
        var list = this.props.ingredients.map((value, index) => <li>{value}
           {" - "} {this.props.measures[index]}</li>)
        return(
            <div className="recipe">
                <button onClick={this.props.back}>Back</button>
                <h2 className="title">{this.props.name}</h2>
                
                <div className="imageIngredients">
                <img src={this.props.image} alt=""/>
                
                 <ul>
                     {list}
                </ul>  
                </div>

                <pre>
                 {this.props.instructions}
                </pre>
            </div>
        )
    }

}

export default Recipe