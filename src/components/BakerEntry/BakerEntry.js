import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import MessageList from '../BulletinBoard/MessageList';
import BakerList from './BakerList';
import * as PRODUCT from '../../constants/products';


class BakerEntry  extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      messages: [],
      inventories: [],
      limit: 5,
      sugar: 0,
      flour: 0,
      eggs: 0,
      recipeName: '',
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

  render() {
    const {
      recipeName,
      sugar,
      flour,
      eggs,
      inventories,
      text, loading, messages,
    } = this.state;

    const canSubmit =
      recipeName === '' ||
      sugar === 0 ||
      flour === 0 ||
      eggs === 0;


    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
          <h2>UserType: Baker (TODO: implement userType)</h2>

            <form
              onSubmit={event =>
                this.onCreateInventory(event, authUser)
              }
            >
              <label><h4>Select Product: </h4></label>
              <input
                name='recipeName'
                id='ensaymada'
                type='radio'
                value={PRODUCT.ENSAYMADA}
                onChange={this.onChangeRadio}
              />
              <label htmlFor="ensaymada">Ensaymada</label>
              <br/>
              <input
                name='recipeName'
                id='pandesal'
                type='radio'
                value={PRODUCT.PANDESAL}
                onChange={this.onChangeIngredient}
              />
              <label htmlFor="jellyroll">Pan de Sal</label>
              <br/>
              <input
                name='recipeName'
                id='jellyroll'
                type='radio'
                value={PRODUCT.JELLYROLL}
                onChange={this.onChangeIngredient}
              />
              <label htmlFor="jellyroll">Jelly Roll</label>
              <br/><br/>

              <label><h4>Ingredients Used: </h4></label>
              <label htmlFor="sugar">Sugar: </label>
              <input
                name='sugar'
                id='sugar'
                onChange={this.onChangeIngredient}
                type="number"
                // placeholder='amount of sugar (in kilos)'
              />
              <br/>
              <label htmlFor="eggs">Eggs: </label>
              <input
                name='eggs'
                id='eggs'
                onChange={this.onChangeIngredient}
                type="number"
                // placeholder='number of eggs (per egg)'
              />
              <br/>
              <label htmlFor="flour">Flour: </label>
              <input
                name='flour'
                id='flour'
                onChange={this.onChangeIngredient}
                type="number"
                // placeholder='sacks of flour'
              />

              <br/><br/>
              <button disabled={canSubmit} type="submit">Submit Inventory</button>
            </form>



            {/*OG CODE BELOW*/}
            {/**************************************************/}
            {/**************************************************/}
            {/**************************************************/}
            {/**************************************************/}
            {/**************************************************/}
            {/*{!loading && messages && (*/}
            {/*  <button type="button" onClick={this.onNextPage}>*/}
            {/*    More*/}
            {/*  </button>*/}
            {/*)}*/}
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
