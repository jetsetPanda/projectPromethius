import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import * as USERTYPE from '../../constants/usertype';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <ul>
    {/*<li>*/}
    {/*  <Link to={ROUTES.LANDING}>Home</Link>*/}
    {/*</li>*/}
    <li>
      <Link to={ROUTES.BULLETIN_BOARD}>Bulletin Board</Link>
    </li>
    {!!authUser.roles[USERTYPE.OWNER] && (
    <li>
      <Link to={ROUTES.REPORTS}>Reports</Link>
    </li>
    )}
    <li>
      <Link to={ROUTES.ENTRY_FORM}>Enter Inventory</Link>
    </li>
    {!!authUser.roles[ROLES.ADMIN] && (
      <li>
        <Link to={ROUTES.ADMIN}>Admin: User List</Link>
      </li>
    )}
    {!!authUser.roles[ROLES.ADMIN] && (
      <li>
        <Link to={ROUTES.SIGN_UP}>Admin: Register New User</Link>
      </li>
    )}
    <li>
      <Link to={ROUTES.ACCOUNT}>My Account</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Sign In</Link>
    </li>
    {/*<li>*/}
    {/*  <Link to={ROUTES.SIGN_IN}>Sign In</Link>*/}
    {/*</li>*/}
  </ul>
);

export default Navigation;
