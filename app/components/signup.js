import React from 'react';
import { History } from 'react-router';
import store from '../store';
import User from '../models/user';

const Signup = React.createClass({
  propTypes: {
    location: React.PropTypes.object
  },

  mixins: [ History ],

  getInitialState() {
    return {
      error: false
    }
  },

  handleSubmit(event) {
    event.preventDefault();

    let email = this.refs.email.value;
    let username = email;
    let password = this.refs.email.value;
    let first_name = this.refs.first_name.value;
    let last_name = this.refs.last_name.value;
    let organization = this.refs.organization.value;
    let phone = this.refs.phone.value;

    let user = new User({username, password, email, first_name, last_name, organization,
    phone});

    user.save().then(() => {
      return store.getSession().authenticate({sessionToken: user.get('sessionToken')}).then(() => {
        let { location } = this.props;
        if (location.state && location.state.nextPathname) {
          this.history.replaceState(null, location.state.nextPathname);
        } else {
          this.history.replaceState(null, '/');
        }
      });
    }, (xhr) => {
      this.setState({ error: xhr.responseJSON.error });
    });
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Sign Up</h1>
        <input type="text" ref="email" placeholder="email" />
        <input type="text" ref="password" placeholder="password" />
        <input type="text" ref="organization" placeholder="organization" />
        <input type="text" ref="first_name" placeholder="First Name" />
        <input type="text" ref="last_name" placeholder="Last Name" />
        <input ref="phone" placeholder="phone" />
        <button type="submit">Sign Up</button>
        {this.state.error && (
          <p>{this.state.error}</p>
        )}
      </form>
    )
  }
})

export default Signup;
