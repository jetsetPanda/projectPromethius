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
          <h4>
            Branch: {inventory.branchLocation}
            <br/>
            Product Name: {inventory.productName}
            <br/>
            Product Code: {inventory.productCode}
            <br/>Submitted On:
            <Moment unix local format=" MM/DD/YYYY hh:mm A">
                {inventory.createdAt.seconds}
            </Moment>
          </h4>
          <h5>By User: <strong>{inventory.createdBy}</strong>
            <br/>
            Designation: {inventory.userType}
            <br/>
            UserID: {inventory.userId}
            <br/>
            Match Recipe Yield? >>> YES (/// TODO IMPLEMENT THIS FEATURE)
            <br/>
            <br/>
            {/*on:             <Moment unix local format=" MM/DD/YYYY hh:mm A">*/}
            {/*    {inventory.createdAt.seconds}*/}
            {/*</Moment>*/}

          </h5>
        </span>

        Submitted Inventory >>>
        <h4>
          Eggs: {inventory.eggs} Pieces
          <br/>
          Flour: {inventory.flour} Sacks
          <br/>
          Sugar: {inventory.sugar} Kilos
          <br/>
          Product Yield/Produced: {inventory.productYield}
        </h4>
        <br/>
        Analysis >>>
        <h4>
          Ingredient (Submitted) || (Recipe) || Yield || Delta
          <br/>
          Eggs (22) || (10) || 2 batches || 2 eggs over
          <br/>
          Flour (22) || (8) || 2 batches || 6 flour over
          <br/>
          Sugar (22) || (9) || 2 batches || 4 sugar over
          <br/>
          Yield (2) batches || excess used/reported ingredients
        </h4>
      </li>
    ))}
  </ul>
);

export default BakerList;
