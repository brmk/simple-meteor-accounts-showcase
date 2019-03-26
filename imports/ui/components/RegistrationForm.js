import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

const formInputs = [
  {
    type: 'text',
    name: 'firstName',
    label: 'First Name',
    required: true,
  },
  {
    type: 'text',
    name: 'lastName',
    label: 'Last Name',
    required: true,
  },
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
    firstName: '',
    lastName: '', 
    email: '',
    password: '',
    loading: false,
  }

  state = {
    ...this.initialState,
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, loading } = this.state;
    if (loading) return;

    // TODO: validate

    const user = {
      email,
      password,
      profile: {
        firstName,
        lastName,
      },
    };

    this.setState({ loading: true });
    Accounts.createUser(user, (error) => {
      if (error) {
        alert(error.reason);
      } else {
        alert('Successfully registered');
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
        <h1>Register</h1>
        {
          formInputs.map(({ label, type, name, ...rest }) => (
            <div key={name}>
              <label>{label}</label><br/>
              <input type={type} value={this.state[name]} onChange={(e) => this.onChange(e.target.value, name)} {...rest} />
            </div>
          ))
        }
        <button type="submit" disabled={loading}>Register</button>
      </form>
    )
  }
}

export default RegistrationForm;
