import React from 'react';
import { Link, IndexLink } from 'react-router';
import store from '../store';
import Session from '../models/session';


var App = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },

    componentWillMount() {
    store.getSession().on('change', this.forceUpdate.bind(this, null), this);
  },

  componentWillUnmount() {
    store.getSession().off('change', null, this);
  },

    handleLogout(e) {
      e.preventDefault();
      var session = store.getSession();
      session.invalidate();
    },


  render() {
    let session = store.getSession();
    let loggedIn = session.isAuthenticated();
    let currentUser = session.get('currentUser');
    let username = (currentUser && currentUser.get('first_name')) || 'Me';
    return (
      <div>
        <nav className="top-bar" data-topbar role="navigation">
          <ul className="title-area">
            <li className="name">
              <h1><IndexLink to="/">Home</IndexLink></h1>
            </li>
          </ul>

          <section className="top-bar-section">
            {/* Left Nav Section */}
            <ul className="left">
              {/*}<li><Link to="/create">Create</Link></li> */}
            </ul>

            <ul className="right">
              {loggedIn &&
                <li className="has-dropdown">
                  <a href="#">Welcome {username}</a>
                  <ul className="dropdown">
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
