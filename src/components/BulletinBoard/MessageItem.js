import React, { Component } from 'react';
import Moment from 'react-moment';

class MessageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.message.text,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <span>
        <br/>
        <li>
          {editMode ? (
            <input
              type="text"
              value={editText}
              onChange={this.onChangeEditText}
            />
          ) : (
            <span>
              <em>From: <strong>{message.username}</strong> </em><br/>
              <em>Sent on: </em>
                <Moment unix local format="ddd MM/DD/YYYY hh:mm ">
                  {message.createdAt.seconds}
                </Moment>
              {/*<p>{message.userId}</p>*/}
              <br/>
              <p>{message.text}</p>
              {message.editedAt && <span>(Edited)</span>}
            </span>
          )}

          {authUser.uid === message.userId && (
            <span>
              {editMode ? (
                <span>
                  <button onClick={this.onSaveEditText}>Save</button>
                  <button onClick={this.onToggleEditMode}>Reset</button>
                </span>
              ) : (
                <button onClick={this.onToggleEditMode}>Edit</button>
              )}

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
        <br/>
      </span>

    );
  }
}

export default MessageItem;
