import React from 'react';
import { History } from 'react-router';
import store from '../store';


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
    let password = this.refs.password.value;
    let first_name = this.refs.first_name.value;
    let last_name = this.refs.last_name.value;
    let organization = this.refs.organization.value;
    let phone = this.refs.phone.value;

  store.createUser({username, email, password, first_name, last_name, organization, phone}).then(()=> {
    let { location } = this.props;
    if (location.state && location.state.nextPathname) {
      this.history.replaceState(null, location.state.nextPathname);
    } else {
      this.history.replaceState(null, '/');
    }

    }, (xhr) => {
      this.setState({ error: xhr.responseJSON.error });
    });
  },

  handleCancel(e) {
    e.preventDefault();
    this.history.pushState({}, "/clients/" + this.props.params.id);
  },

  render() {
    return (
    <div className="row">
      <div className="small-10 columns">
      <form onSubmit={this.handleSubmit}>
        <fieldset>
        <legend className="legend">Sign Up</legend>
        <input type="text" ref="email" placeholder="email" />
        <input type="password" ref="password" placeholder="password" />
        <input type="text" ref="organization" placeholder="organization" />
        <input type="text" ref="first_name" placeholder="First Name" />
        <input type="text" ref="last_name" placeholder="Last Name" />
        <input ref="phone" placeholder="phone" />

          <div className="button-bar">
            <ul className="button-group round">
              <li><button className="button success tiny" type="submit">Submit</button></li>
            </ul>

            <ul className="button-group round">
              <li><button className="button alert tiny" onClick={this.handleCancel}>Cancel</button></li>
            </ul>
          </div>

        {this.state.error && (
          <p>{this.state.error}</p>
        )}
        </fieldset>
      </form>
      </div>
    </div>
    )
  }
})

export default Signup;
