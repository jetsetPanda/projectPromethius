import React, { Component } from 'react';

class BakerItem extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   inventory: this.props.inventory
    //   editText: this.props.message.text,
    // };
  }

  render() {
    const { authUser, inventory } = this.props;

    return (
      <li>
        {authUser.uid === inventory.userId && (
          <span>

            {!editMode && (
              <button
                type="button"
                onClick={() => onRemoveMessage(message.uid)}
              >
                Delete
              </button>
            )}
          </span>
        )}
      </li>
    );
  }
}

export default BakerItem;
