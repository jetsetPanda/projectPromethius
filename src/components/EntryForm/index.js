import React from 'react';
import { compose } from 'recompose';

import {
  withAuthorization,
  // withEmailVerification
} from '../Session';
import BakerEntry from '../BakerEntry';

const EntryForm = () => (
  <div>
    <h1>Entry Form</h1>
    <p>Ingredient Input by User Type</p>

    <BakerEntry />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  // withEmailVerification,
  withAuthorization(condition),
)(EntryForm);
