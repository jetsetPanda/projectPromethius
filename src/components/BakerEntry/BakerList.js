import React from 'react';
import Moment from 'react-moment';

const BakerList = ({
   authUser,
   inventories,
 }) => (
  <ul>
    {inventories.map(inventory => (

      <li>
        <span>
          <h4>Submitted On:<br/>
            <Moment unix local format="MM/DD/YYYY">
               {inventory.createdAt.seconds}
            </Moment>
          </h4>
          <h5>By User: <strong>{inventory.createdBy}</strong>
            <br/>
            Designation: {inventory.userType}
            <br/>
            Branch: {inventory.branchLocation}
            <br/>
            on: {inventory.createdAt.seconds}
            <br/>
            UserID: {inventory.userId}
          </h5>
        </span>



        <h4>Product Display Name: {inventory.productName} </h4>
        <h5>Product Code: {inventory.productCode}</h5>
        <h4>
          Eggs: {inventory.eggs} Pieces
          <br/>
          Flour: {inventory.flour} Sacks
          <br/>
          Sugar: {inventory.sugar} Kilos
          <br/>
          Product Yield/Produced: {inventory.productYield}
        </h4>
        <br/><br/>
      </li>
    ))}
  </ul>
);

export default BakerList;
