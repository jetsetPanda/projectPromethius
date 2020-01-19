import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import MessageList from '../BulletinBoard/MessageList';
import BakerList from '../BakerEntry/BakerList';
import * as PRODUCT from '../../constants/products';


class Dashboard  extends Component {
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
            <h3>Username: {authUser.username}</h3>
            <h3>Branch: </h3>

            <br/><br/>
            {loading && <div>Loading ... </div>}
            <hr/>
            <h3>Submitted Inventories:</h3>

            {inventories && (
              <BakerList
                authUser='Todo: Implement Branch and Username'
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

export default withFirebase(Dashboard);
