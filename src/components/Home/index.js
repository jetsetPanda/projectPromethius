import React from 'react';
import { compose } from 'recompose';

import {
  withAuthorization,
  // withEmailVerification
} from '../Session';
import Messages from '../Messages';

const HomePage = () => (
  <div>
    <h1>Messaging</h1>
    <p>This page demonstrates CRUD functions in Firebase Firestore:</p>

    <Messages />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  // withEmailVerification,
  withAuthorization(condition),
)(HomePage);
