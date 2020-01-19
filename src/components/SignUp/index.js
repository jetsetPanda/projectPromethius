import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { USERTYPES } from '../../constants/usertype';
import { BRANCHES } from '../../constants/branches';
import { PRODUCTS } from '../../constants/products';

const SignUpPage = () => (
  <div>
    <h1>Register New User</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  branchlist : '',
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  isInventory: false,
  error: null,
  userType: '',
  branchLocation: '',
  roles : {},
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin, isInventory, userType, branchLocation, roles } = this.state;

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    } else {
      roles[ROLES.NOTADMIN] = ROLES.NOTADMIN;
    }

    if (isInventory) {
      roles[ROLES.CAN_INVENTORY] = ROLES.CAN_INVENTORY;
    } else {
      roles[ROLES.CANNOT_INVENTORY] = ROLES.CANNOT_INVENTORY;
    }

    roles[userType] = userType;
    roles[branchLocation] = branchLocation;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set(
          {
            username,
            email,
            roles,
            userType,
            branchLocation,
          },
          { merge: true },
        );
      })
      // .then(() => {
      //   return this.props.firebase.doSendEmailVerification();
      // })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.BULLETIN_BOARD);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeDropdown = event => {
    // this.setState({
    //   roles: {[event.target.value] : event.target.value},
    //   [event.target.name]: event.target.value,
    // });
    this.setState({ [event.target.name]: event.target.value });

  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      isInventory,
      userType,
      branchLocation,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Username"
        />
        <br/>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <br/>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <br/>
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <br/><br/>
        <label>
          User Type:
          <select
            name="userType"
            onChange={this.onChangeDropdown}>

            {USERTYPES.map(usertype => (
              <option value={usertype.code}>{usertype.displayName}</option>
            ))}

          </select>
        </label>
        <br/><br/>
        <label>
          Branch:
          <select
            name="branchLocation"
            onChange={this.onChangeDropdown}>

            {BRANCHES.map(branch => (
              <option value={branch.code}>{branch.displayName}</option>
            ))}

            {/*<option value={BRANCHES.BRANCH_BUTUAN_PALENGKE.code}>{BRANCHES.BRANCH_BUTUAN_PALENGKE.displayName}</option>*/}
            {/*<option value={BRANCHES.BRANCH_BUTUAN_ROBINSONS.code}>{BRANCHES.BRANCH_BUTUAN_ROBINSONS.displayName}</option>*/}
            {/*<option value={BRANCHES.BRANCH_BUTUAN_ESTACIO.code}>{BRANCHES.BRANCH_BUTUAN_ESTACIO.displayName}</option>*/}
            {/*<option value={BRANCHES.BRANCH_CAGAYAN_GAISANO.code}>{BRANCHES.BRANCH_CAGAYAN_GAISANO.displayName}</option>*/}
            {/*<option value={BRANCHES.BRANCH_DAVAO_SMLANANG.code}>{BRANCHES.BRANCH_DAVAO_SMLANANG.displayName}</option>*/}
            {/*<option value={BRANCHES.BRANCH_DUBAI_BURJ.code}>{BRANCHES.BRANCH_DUBAI_BURJ.displayName}</option>*/}
            {/*<option value={BRANCHES.BRANCH_HQ_MAINOFFICE.code}>{BRANCHES.BRANCH_HQ_MAINOFFICE.displayName}</option>*/}
            {/*<option value={BRANCHES.BRANCH_HQ_ACCOUNTINGOFFICE.code}>{BRANCHES.BRANCH_HQ_ACCOUNTINGOFFICE.displayName}</option>*/}

          </select>
        </label>
        <br/>
        <br/>
        <label>
          Give {[ROLES.ADMIN]} Access?
          <input
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label>
        <br/>
        <label>
          Can User Enter Inventory?
          <input
            name="isInventory"
            type="checkbox"
            checked={isInventory}
            onChange={this.onChangeCheckbox}
          />
        </label>
        <br/><br/>
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
