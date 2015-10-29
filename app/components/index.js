import React from 'react';
import { Link, IndexLink } from 'react-router';
import store from '../store';
import BackboneMixin from '../mixins/backbone';


var Index = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },
  mixin: [BackboneMixin],

  render() {
      let session= store.getSession();
      let currentUser = session.currentUser;
      let username = (currentUser && currentUser.first_name)
    return (
      <div>
      <h1>Welcome {username}</h1>
      <h4 className="bullitenBoard">Bulletin Board</h4>
      {this.props.children}
      </div>
    );
  }

});

export default Index;
