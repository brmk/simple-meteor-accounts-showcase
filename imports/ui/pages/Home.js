import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';
import UserInfo from '../components/UserInfo';

class Home extends Component {
  render() {
    const { isLoggedIn, loading, currentUser } = this.props;
    console.log(this.props);

    if (loading) return <h1>Loading...</h1>

    return (
      <div>
        {
          !isLoggedIn ? (
            <Fragment>
              <RegistrationForm />
              <LoginForm/>
            </Fragment>
          ) : (
            <UserInfo user={currentUser} />
          )
        }
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    isLoggedIn: !!Meteor.userId(),
    currentUser: Meteor.user(),
    loading: Meteor.loggingIn(),
  };
})(Home);
