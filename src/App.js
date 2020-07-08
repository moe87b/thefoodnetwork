import React from 'react'
import Header from './components/Header'
import Search from './components/Search'



class App extends React.Component
{
  
  constructor()
  {
    super()
    {
      this.state = {categories: []}
    }
  }

  componentDidMount()
  {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then(response => response.json())
        .then(data => {
            var cat = []
            for(var i =0; i< data.categories.length; i++)
            {
               if(data.categories[i].strCategory !== "Pork")
                cat.push({ id: data.categories[i].idCategory,
                  category: data.categories[i].strCategory})


            }
            this.setState( {categories : cat} )
        })
  }

  render()
  {
    return(
    <div>
      <Header/>
      <main>
      <Search categories={this.state.categories}/>
      </main>
    </div>)
  }
 
}

export default App