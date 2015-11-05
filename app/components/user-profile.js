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

   handleEdit(e) {
     e.preventDefault();
     console.log('edit');
     this.setState({
       isEditing: !this.state.isEditing
     });
   },

   handleName(e) {
     this.setState({
       user: update(this.state.user, {
         first_name: {$set: e.target.value},
         last_name: {$set: e.target.value},
         email: {$set: e.target.value},
         password: {$set: e.target.value},
         orgainization: {$set: e.target.value},
         phone: {$set: e.target.value},
       })
     });
   },

   handleSubmit(e) {
     e.preventDefault();
     store.saveUser(this.state.user);
     this.handleEdit();
   },

  render() {
    let user = this.state.user;

    if(this.state.isEditing) {

      return(
          <div className="row">
            <div className="small-10 columns">
              <h1>{user.first_name} {user.last_name}</h1>
            <form onSubmit={this.handleSubmit}>
              <fieldset>

                <div className="row collapse">
                    <div className="small-2 columns">
                      <span className="prefix">First Name</span>
                    </div>
                    <div className="small-10 columns">
                      <input type="text" value={user.first_name} placeholder="First Name" onChange={this.handleName} />
                    </div>
                </div>

                <div className="row collapse">
                    <div className="small-2 columns">
                      <span className="prefix">Last Name</span>
                    </div>
                    <div className="small-10 columns">
                      <input type="text" value={user.last_name} placeholder="Last Name" onChange={this.handleName} />
                    </div>
                </div>

                <div className="row collapse">
                    <div className="small-2 columns">
                      <span className="prefix">Email</span>
                    </div>
                    <div className="small-10 columns">
                      <input type="text" value={user.email} placeholder="email" onChange={this.handleName} />
                    </div>
                </div>

                <div className="row collapse">
                    <div className="small-2 columns">
                      <span className="prefix">Password</span>
                    </div>
                    <div className="small-10 columns">
                      <input type="password" value={user.password} placeholder="password" onChange={this.handleName} />
                    </div>
                </div>

                <div className="row collapse">
                    <div className="small-2 columns">
                      <span className="prefix">Organization</span>
                    </div>
                    <div className="small-10 columns">
                      <input type="text" value={user.organization} placeholder="organization" onChange={this.handleName} />
                    </div>
                </div>

                <div className="row collapse">
                    <div className="small-2 columns">
                      <span className="prefix">Phone</span>
                    </div>
                    <div className="small-10 columns">
                      <input value={user.phone} placeholder="phone" onChange={this.handleName} />
                    </div>
                </div>

              <button className="button success" onClick={this.handleSubmit}>Update</button>
              </fieldset>
            </form>
            </div>
          </div>
      );
    } else {
    return (
        <div className="row">
          <div className="small-10 columns">
            <h1>{user.first_name} {user.last_name}</h1>
          <form onSubmit={this.handleEdit}>
            <fieldset>

            <div className="row collapse">
                <div className="small-2 columns">
                  <span className="prefix">First Name</span>

                </div>
                <div className="small-10 columns">
                  <input type="text" value={user.first_name} placeholder="First Name" />
                </div>
            </div>

            <div className="row collapse">
                <div className="small-2 columns">
                  <span className="prefix">Last Name</span>

                </div>
                <div className="small-10 columns">
                  <input type="text" value={user.last_name} placeholder="Last Name" />
                </div>
            </div>

            <div className="row collapse">
                <div className="small-2 columns">
                  <span className="prefix">Email</span>

                </div>
                <div className="small-10 columns">
                  <input type="text" value={user.email} placeholder="email" />
                </div>
            </div>

            <div className="row collapse">
                <div className="small-2 columns">
                  <span className="prefix">Password</span>

                </div>
                <div className="small-10 columns">
                  <input type="password" value={user.password} placeholder="password" />
                </div>
            </div>

            <div className="row collapse">
                <div className="small-2 columns">
                  <span className="prefix">organization</span>

                </div>
                <div className="small-10 columns">
                  <input type="text" value={user.organization} placeholder="organization" />
                </div>
            </div>

            <div className="row collapse">
                <div className="small-2 columns">
                  <span className="prefix">Phone Number</span>

                </div>
                <div className="small-10 columns">
                  <input value={user.phone} placeholder="phone" />
                </div>
            </div>

            <button className="button alert" onClick={this.handleEdit}>Edit</button>
            </fieldset>
          </form>
          </div>
        </div>

    );
  }
  }
});
export default UserProfile;
