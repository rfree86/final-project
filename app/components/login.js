import React from 'react';
import { Link } from 'react-router';
import { History } from 'react-router';
import store from '../store';

const Login = React.createClass({

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
    event.preventDefault()

    let username = this.refs.email.value
    let password = this.refs.password.value

    store.authenticateSession({username, password}).then((loggedIn) =>{
      if (!loggedIn)
      return this.setState({ error: true})



      var { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.history.replaceState(null, location.state.nextPathname)
      } else {
        this.history.replaceState(null, '/')
      }
    })
  },

  render() {
    return (

  <div className="login-page">
    <h1 className="login-title">Helping Hand</h1>

    <div className="row js-login-box">
     <div className="small-12 columns">
      <form onSubmit={this.handleSubmit}>
        <fieldset className="login-fieldset">
        <legend>Login</legend>
        <input className="login-input" ref="email" placeholder="email" />
        <input type="password" ref="password" placeholder="password" />
          <div className="button-bar">
            <ul className="button-group round">
              <li><button className="button success" type="submit">Login</button></li>
              <li><button className="button secondary "><Link to="/signup"> Sign Up</Link></button></li>
            </ul>
          </div>
        {this.state.error && (
          <p>Bad login information</p>
        )}
        </fieldset>
      </form>
     </div>
    </div>
  </div>

    )
  }
})

export default Login;
