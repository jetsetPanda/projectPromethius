import React from 'react';
import { compose } from 'recompose';

import {
  withAuthorization,
  // withEmailVerification
} from '../Session';
import Dashboard from './dashboard';

const Reports = () => (
  <div>
    <h1>Report Dashboard</h1>
    <p>To Do: Branch Reporting</p>

    <Dashboard />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  // withEmailVerification,
  withAuthorization(condition),
)(Reports);
