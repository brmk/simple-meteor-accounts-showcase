import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

class UserInfo extends Component {
  logout = () => {
    Meteor.logout();
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        {JSON.stringify(user)}
        <button type="button" onClick={this.logout}>Logout</button>
     </div>
    )
  }
}

export default UserInfo;
