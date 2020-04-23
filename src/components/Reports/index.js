import React from 'react';
import { compose } from 'recompose';
import { Link, Route, Switch } from 'react-router-dom';

import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

import Dashboard from './dashboard';
import RecipeList from './RecipeList';
import * as ROUTES from '../../constants/routes';


const Reports = () => (
    <div>
      <h1>Reporting Portal</h1>

      <p>
        <Link to={ROUTES.SUBMITTED_INVENTORIES}>Submitted Inventories</Link>
        <br/>
        <Link to={ROUTES.MASTER_RECIPES}>Master Recipe List</Link>
      </p>
      <hr/>
      <Switch>
            <Route path exact={ROUTES.REPORTS}/>
            <Route path={ROUTES.SUBMITTED_INVENTORIES} component={Dashboard}></Route>
            <Route path={ROUTES.MASTER_RECIPES} component={RecipeList}></Route>
      </Switch>
    </div>
);

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition),
)(Reports);
