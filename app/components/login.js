import React from 'react';
import { Link } from 'react-router';
import { History } from 'react-router';
import store from '../store';

const Login = React.createClass({

  propTypes: {
    location: React.PropTypes.object
  },

  mixins: [ History ],

//this logic was copied from my instructors applicatoiin
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

        this.history.replaceState(null, '/')

    })
  },

  render() {
    return (

  <div className="login-page">
    <div className="login-overlay"></div>
    <h1 className="login-title">HELPING HAND</h1>
    <blockquote className="login-quote">
      There is no better way to thank God for your sight than by giving a helping hand to someone in the dark.<br />
    -Hellen Keller
    </blockquote>

    <div className="row js-login-box">
     <div className="small-12 columns">

      <form onSubmit={this.handleSubmit}>
        <fieldset>
        <legend className="legend">LOGIN</legend>
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
