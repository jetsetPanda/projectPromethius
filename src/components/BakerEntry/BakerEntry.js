import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import BakerList from './BakerList';
import { PRODUCTS } from '../../constants/products';

import { Button } from '@material-ui/core';

class BakerEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      inventories: [],
      limit: 5,
      sugar: null,
      flour: null,
      eggs: null,
      recipeName: null,
      productYield: null,
      code: null
    };
  }

  componentDidMount() {
    this.onListenForInventories();
  }

  onListenForInventories = () => {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .inventories()
      .orderBy('createdAt', 'desc')
      .limit(this.state.limit)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let inventories = [];
          snapshot.forEach(doc =>
            inventories.push({ ...doc.data(), uid: doc.id }),
          );

          this.setState({
            inventories: inventories.reverse(),
            loading: false,
          });
        } else {
          this.setState({ inventories: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCreateInventory = (event, authUser) => {
    this.props.firebase.inventories().add({
      recipeName: this.state.recipeName,
      sugar: this.state.sugar,
      flour: this.state.flour,
      eggs: this.state.eggs,
      userId: authUser.uid,
      createdAt: this.props.firebase.fieldValue.serverTimestamp(),
    })
  };

  onChangeIngredient = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log("ingredient changed", this.state);
  };

  onChangeRadio = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log("product changed", this.state);
  };

  render() {
    const {
      recipeName,
      sugar,
      flour,
      eggs,
      productYield,
      inventories,
      loading
    } = this.state;

    const canSubmit =
      recipeName === null ||
      sugar === null ||
      flour === null ||
      eggs === null ||
      productYield === null;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
          <h2>UserType: (TODO: implement userType)</h2>

            <form
              onSubmit={event =>
                this.onCreateInventory(event, authUser)
              }
            >

              <hr/>

              <label><h4>Select Product to Inventory: </h4></label>

              {PRODUCTS.map(product => (
                <>
                  <input
                    name='recipeName'
                    id={product.code}
                    type='radio'
                    value={product.code}
                    onChange={this.onChangeRadio}
                  />
                  <label htmlFor={product.code}> {product.displayName}</label>
                  <br/>
                </>
              ))}

              <br/>
              <hr/>

              <label><h4>Ingredients Used: </h4></label>

              {PRODUCTS[0].ingredientChoices.map(ingredient => (
                <div>

                  <label htmlFor={ingredient.code}>{ingredient.displayName} </label>
                  <input
                    name={ingredient.code}
                    id={ingredient.code}
                    onChange={this.onChangeIngredient}
                    type={ingredient.code}
                    placeholder={ingredient.placeholderCopy}
                  />
                  <br/>

                </div>
              ))}

              <br/>
              <hr/>

              <label><h4>Product Yield: </h4></label>
              <label htmlFor="productYield">Yield: </label>
              <input
                name='productYield'
                id='productYield'
                onChange={this.onChangeIngredient}
                type="number"
                placeholder='amount of product made'
              />
              <br/><br/>

              <hr/>
              <br/>
              <button
                // variant="contained"
                disabled={canSubmit}
                type="submit"
              >
                Submit Inventory
              </button>
            </form>

            <br/><br/>
            {loading && <div>Loading ... </div>}
            <hr/>
            <h3>IMPLEMENT::: Previously Submitted Inventories for this Branch:</h3>
            {inventories && (
              <BakerList
                authUser={authUser}
                inventories={inventories}
              />
            )}

            {!inventories && <div>There are no submitted inventories ...</div>}

          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(BakerEntry);
