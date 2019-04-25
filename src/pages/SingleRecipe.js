import React, { Component } from "react";
import {Link} from "react-router-dom";
export default class SingleRecipe extends Component {
  constructor(props){
    super(props);
    this.state ={
      recipe: {},
      id: this.props.match.params.id,
      loading: true
    }
  }

  async componentDidMount(){
    const url=`http://www.food2fork.com/api/get?key=${process.env.REACT_APP_API_KEY}&rId=${this.state.id}`;
    try{
      const response = await fetch(url);
      const rd = await response.json();
      this.setState({
        recipe: rd.recipe,
        loading: false
      });
    }catch(error){
      console.log(error);
    }
  }
  render() {
    const{image_url,publisher,publisher_url,source_url,
      title,ingredients} = this.state.recipe;
    if(this.state.loading){
      return(

        <div className="container">
        <div className="row">
        <div className="col-10 mx-auto col-md-6 my-3">
          <h2 className="text-capitalize text-orange text-center">Loading recipe</h2>
        </div>
        </div>
        </div>
      );
    }
    else{
      return (
        <div className="container">
          <div className="row">
          <div className="col-10 mx-auto col-md-6 my-3">
          <Link to="/recipes" className="btn btn-warning mb-5">
            back to recipe
          </Link>
          <img src={image_url} 
            className="d-block w-100" 
            style={{maxHeight: "30rem"}}
            alt="recipe"
          />
          </div>
          <div className="col-10 mx-auto col-md-6 my-3">
          <h6 className="text-uppercase">{title}</h6>
          <h6 className="text-warning text-capitalize 
          text-slanted">
          provided by {publisher}
          </h6>
          <a
            href={publisher_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-2 text-capitalize"
          >
          Publisher Web Page
          </a>
          <a
            href={source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success mt-2 text-capitalize mt-2 mx-2"
          >
          Recipe Url
          </a>

          <ul>
            <h2 className="mt-3 mb-4">Ingredients</h2>
            {ingredients.map((item,index) => { 

              return(
                <li key={index} className="list-group-item 
                text slanted">
                  {item}
                </li>
              );
            })}
          </ul>


 

          </div>
          </div>
        </div>

      );
    }
    // return (<h4>
    //   Hello From Single Recipe Page is 
    //   {this.props.match.params.id}

    // </h4>);
  }
}
