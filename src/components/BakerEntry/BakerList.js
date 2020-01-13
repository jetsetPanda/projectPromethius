import React from 'react';
import { moment, unix } from 'moment';

const BakerList = ({
   authUser,
   inventories,
 }) => (
  <ul>
    {inventories.map(inventory => (

      <li>
        <h5>User Name: {authUser.username}</h5>
        <h5>Product Name: {inventory.recipeName}</h5>
        <p>Eggs: {inventory.eggs} Pieces</p>
        <p>Flour: {inventory.flour} Sacks</p>
        <p>Sugar: {inventory.sugar} Kilos</p>
        <h6>Submitted on: {inventory.createdAt.seconds}</h6>
        <h6>UserID: {inventory.userId} </h6>
      </li>
    ))}
  </ul>
);

export default BakerList;
