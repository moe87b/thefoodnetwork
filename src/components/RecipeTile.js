import React from 'react'

class RecipeTile extends React.Component
{
   

    constructor(props)
    {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

  handleClick()
  {
      this.props.sendToParent(this.props.name)
  }
   
    render()
    {
       return(<div className="tile" onClick={this.handleClick}>
            <img  className="thumbNail" src={this.props.image} alt=""/>
            <h3 >{this.props.name}</h3>
            
        </div>)
    }
}

export default RecipeTile