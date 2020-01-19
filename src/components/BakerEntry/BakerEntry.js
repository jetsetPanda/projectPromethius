import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import MessageList from '../BulletinBoard/MessageList';
import BakerList from './BakerList';
// import * as PRODUCT from '../../constants/products';
import { PRODUCTS } from '../../constants/products';
import { USERTYPES } from '../../constants/usertype';

class BakerEntry  extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      messages: [],
      inventories: [],
      limit: 5,
      sugar: null,
      flour: null,
      eggs: null,
      recipeName: null,
      productYield: null,

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

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };


  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForMessages,
    );
  };

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
  };

  onChangeRadio = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      recipeName,
      sugar,
      flour,
      eggs,
      productYield,
      inventories,
      text, loading, messages,
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

              <label><h4>Select Product to Inventory: </h4></label>

              {PRODUCTS.map(product => (
                <>
                  <input
                    name={product.code}
                    id={product.code}
                    type='radio'
                    value={product.code}
                    onChange={this.onChangeRadio}
                  />
                  <label htmlFor={product.code}> {product.displayName}</label>
                  <br/>
                </>
              ))}


              <label><h4>Ingredients Used: </h4></label>

              <label htmlFor="sugar">Sugar: </label>
              <input
                name='sugar'
                id='sugar'
                onChange={this.onChangeIngredient}
                type="number"
                placeholder='amount of sugar (in kilos)'
              />
              <br/>
              <label htmlFor="eggs">Eggs: </label>
              <input
                name='eggs'
                id='eggs'
                onChange={this.onChangeIngredient}
                type="number"
                placeholder='number of eggs (per egg)'
              />
              <br/>
              <label htmlFor="flour">Flour: </label>
              <input
                name='flour'
                id='flour'
                onChange={this.onChangeIngredient}
                type="number"
                placeholder='sacks of flour'
              />

              <br/><br/>

              <label><h4>Product Yield: </h4></label>
              <label htmlFor="productYield">Yield: </label>
              <input
                name='productYield'
                id='productYield'
                onChange={this.onChangeIngredient}
                type="number"
                placeholder='amount of product made'
              />
              <br/>



              <br/><br/>
              <button disabled={canSubmit} type="submit">Submit Inventory</button>
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

            {/*<form*/}
            {/*  onSubmit={event =>*/}
            {/*    this.onCreateMessage(event, authUser)*/}
            {/*  }*/}
            {/*>*/}
            {/*  <input*/}
            {/*    type="text"*/}
            {/*    value={text}*/}
            {/*    onChange={this.onChangeText}*/}
            {/*  />*/}
            {/*  <button type="submit">Send</button>*/}
            {/*</form>*/}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(BakerEntry);
