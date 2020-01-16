import React from 'react';
import { compose } from 'recompose';

import {
  withAuthorization,
  // withEmailVerification
} from '../Session';
import Messages from './';

const BulletinBoard = () => (
  <div>
    <h1>Bulletin Board </h1>
    <p>Messages below are dynamically stored in Firebase Firestore:</p>

    <Messages />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  // withEmailVerification,
  withAuthorization(condition),
)(BulletinBoard);
