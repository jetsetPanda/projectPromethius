import React from 'react';
import { compose } from 'recompose';

import {
  withAuthorization,
  // withEmailVerification
} from '../Session';
import Messages from './Messages';

const BulletinBoard = () => (
  <div>
    <h1>Jeff Bulletin Board </h1>
    <h3>Companywide Messaging System</h3>
    <p>(only you can edit or delete your own messages)</p>

    <Messages />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  // withEmailVerification,
  withAuthorization(condition),
)(BulletinBoard);