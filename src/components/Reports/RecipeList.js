import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

class RecipeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      loading: false,
    }
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes = () => {
    this.setState( { loading: true });

    this.props.firebase
      .recipes()
      .get()
      .then(snapshot => {
        if (snapshot.size) {
          const recipeData = snapshot.docs.map(doc => doc.data());
          console.log('recipeData', recipeData);

          this.setState({
            recipes: recipeData,
            loading: false,
          })
        } else {
          this.setState( { recipes: null, loading: false });
        }
      });
  };


  render() {
    const {
      recipes,
      loading,
    } = this.state;


    return (
      <div>
        <h2>Master Recipe List</h2>
        {loading && <div>Loading Master Recipe List... </div>}
        <ul>
          {recipes.map(recipe => (
            <li>
              <h3>Product Name: <strong>{recipe.productName}</strong></h3>
              <h5>
                Product Code: <em>{recipe.productCode}</em>
                <br/>
                Product Category: <em>{recipe.productCategory}</em>
              </h5>
              <h4>
                RECIPE PER BATCH YIELD <br/>
                One batch of <em>{recipe.productCode}</em> is
                <strong><em>  {recipe.productYield} {recipe.productYieldName}
                </em></strong>
                <br/>
                and requires:
                <br/>
                Eggs: <em>{recipe.eggs} Pieces</em>
                <br/>
                Flour: <em>{recipe.flour} Sacks</em>
                <br/>
                Sugar: <em>{recipe.sugar} Kilos</em>
                <br/>
              </h4>
            </li>
          ))}
        </ul>

        {!recipes && <div>Master Recipe List is Empty...</div>}


      </div>

    );

  }
}
export default withFirebase(RecipeList);
