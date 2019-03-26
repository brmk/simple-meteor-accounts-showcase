import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

const formInputs = [
  {
    type: 'text',
    name: 'email',
    label: 'Email',
    required: true,
  },
  {
    type: 'password',
    name: 'password',
    label: 'Password',
    required: true,
  },
];

class RegistrationForm extends Component {
  initialState = {
    email: '',
    password: '',
    loading: false,
  }

  state = {
    ...this.initialState,
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password, loading } = this.state;
    if (loading) return;

    this.setState({ loading: true });
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        alert(error.reason);
      } else {
        alert('Successfully logged in');
        this.setState({ ...this.initialState });
      }
    });
  }

  onChange = (value, name) => {
    this.setState({ [name]: value });
  }

  render() {
    const { loading } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>
        {
          formInputs.map(({ label, type, name, ...rest }) => (
            <div key={name}>
              <label>{label}</label><br/>
              <input type={type} value={this.state[name]} onChange={(e) => this.onChange(e.target.value, name)} {...rest} />
            </div>
          ))
        }
        <button type="submit" disabled={loading}>Login</button>
      </form>
    )
  }
}

export default RegistrationForm;
