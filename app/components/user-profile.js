import React from 'react';
import BackboneMixin from '../mixins/backbone';
import store from '../store';
import { History } from 'react-router';
import update from 'react-addons-update';
import moment from 'moment';

const UserProfile = React.createClass({
  mixins: [History, BackboneMixin],

  getInitialState() {
    return {
      isEditing: false,
    };
  },

   getModels() {
     var userId = store.getSession().currentUser.objectId;
     return {
       user: store.getUser(userId)
     };
   },

   handleName(e) {
     this.setState({
       user: update(this.state.user, {
         first_name: {$set: e.target.value}
       })
     });
   },

   handleSubmit(e) {
     e.preventDefault();
     store.saveUser(this.state.user);
   },

  render() {
    let user = this.state.user;
    return (
        <div className="row">
          <div className="small-10 columns">
            <h1>{user.first_name} {user.last_name}</h1>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <label>First Name
            <input type="text" value={user.first_name} placeholder="First Name" />
            </label>
            <input type="text" value={user.last_name} placeholder="Last Name" />
            <input type="text" value={user.email} placeholder="email" />
            <input type="password" value={user.password} placeholder="password" />
            <input type="text" value={user.organization} placeholder="organization" />
            <input value={user.phone} placeholder="phone" />
            <button className="button alert">Edit</button>
            </fieldset>
          </form>
          </div>
        </div>

    )
  }
});
export default UserProfile;
