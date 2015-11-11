import React from 'react';
import { Link, IndexLink } from 'react-router';
import BackboneMixin from '../mixins/backbone';
import store from '../store';
import { History } from 'react-router';




var App = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },

  mixins: [History, BackboneMixin],

//get the currrent user session
  getModels() {
    return {
      session: store.getSession()
    }
  },

    handleLogout(e) {
      e.preventDefault();
    store.invalidateSession();
    },

//navigation bar with customized info based on the currentUser info
  render() {
    let session = this.state.session;
    let loggedIn = session.isAuthenticated;
    let currentUser = session.currentUser;
    let username = (currentUser && currentUser.email) || 'Me';
    return (
      <div>
        <nav className="top-bar" data-topbar role="navigation" data-options="mobile_show_parent_link: true">
          <ul className="title-area">
            <li className="name">
              <h1><IndexLink to="/">Home</IndexLink></h1>
            </li>
          </ul>

          <section className="top-bar-section">
            {/* Left Nav Section */}
            <ul className="left">
              <li className="name">
                <Link to="/clients">Clients</Link>
              </li>

              <li className="has-dropdown">
                <a href="#">Add Options</a>
                  <ul className="dropdown">
                    <li><Link to="/bulletin">Create New Bulletin</Link></li>
                    <li><Link to="/create">Create New Client</Link></li>
                  </ul>
              </li>
            </ul>

            <ul className="right">
              {loggedIn &&
                <li className="has-dropdown">
                  <a href="#">{username}</a>
                  <ul className="dropdown">
                    <li><Link to="/user">Your Profile</Link></li>
                    <li><a href="#" onClick={this.handleLogout}>Logout</a></li>
                  </ul>
                </li>
                  }
              </ul>
          </section>
        </nav>

        {this.props.children}
      </div>
    );
  }
});

export default App;
