import React from 'react';
import BackboneMixin from '../mixins/backbone';
import store from '../store';
import { History } from 'react-router';
import update from 'react-addons-update';
import moment from 'moment';

const UserProfile = React.createClass({
  mixins: [History, BackboneMixin],

//set the toggle class for editing to false
  getInitialState() {
    return {
      isEditing: false,
    };
  },
//get the currentUser profile information from parse and render on page
   getModels() {
     var userId = store.getSession().currentUser.objectId;
     return {
       user: store.getUser(userId)
     };
   },

//toggle the editing class to true and render the if segment which will allow changes to the user information
   handleEdit(e) {
     e.preventDefault();
     this.setState({
       isEditing: !this.state.isEditing
     });
   },
   //this code is based off instructors application.  resets the value of the changed information
   //and creates a new copy of the object in parse using "update".  Any client information changed is saved even if submit is not clicked.
   handleChange(prop, e) {
     let newState = {};
     newState[prop] = {
       $set: e.target.value
     };

     this.setState({
       user: update(this.state.user, newState)
     });
   },
//save the current information for the user and then toggle editing back to false and render the else segment 
   handleSubmit(e) {
     e.preventDefault();
     store.saveUser(this.state.user);
     this.handleEdit(e);
   },

  render() {
    let user = this.state.user;

    if(this.state.isEditing) {

      return(
          <div className="row user-profile">
            <div className="small-10 columns">
              <h1 className="user-title">{user.first_name} {user.last_name}</h1>
            <form onSubmit={this.handleSubmit}>
              <fieldset>

                <div className="row collapse">
                    <div className="small-2 columns">
                      <span className="prefix">First Name</span>
                    </div>
                    <div className="small-10 columns">
                      <input type="text" value={user.first_name} placeholder="First Name" onChange={this.handleChange.bind(this, 'first_name')} />
                    </div>
                </div>

                <div className="row collapse">
                    <div className="small-2 columns">
                      <span className="prefix">Last Name</span>
                    </div>
                    <div className="small-10 columns">
                      <input type="text" value={user.last_name} placeholder="Last Name" onChange={this.handleChange.bind(this, 'last_name')} />
                    </div>
                </div>

                <div className="row collapse">
                    <div className="small-2 columns">
                      <span className="prefix">Email</span>
                    </div>
                    <div className="small-10 columns">
                      <input type="text" value={user.email} placeholder="Email" onChange={this.handleChange.bind(this, 'email')} />
                    </div>
                </div>

                <div className="row collapse">
                    <div className="small-2 columns">
                      <span className="prefix">Password</span>
                    </div>
                    <div className="small-10 columns">
                      <input type="password" value={user.password} placeholder="Password" onChange={this.handleChange.bind(this, 'password')} />
                    </div>
                </div>

                <div className="row collapse">
                    <div className="small-2 columns">
                      <span className="prefix">Organization</span>
                    </div>
                    <div className="small-10 columns">
                      <input type="text" value={user.organization} placeholder="Organization" onChange={this.handleChange.bind(this, 'organization')} />
                    </div>
                </div>

                <div className="row collapse">
                    <div className="small-2 columns">
                      <span className="prefix">Phone</span>
                    </div>
                    <div className="small-10 columns">
                      <input value={user.phone} placeholder="phone" onChange={this.handleChange.bind(this, 'phone')} />
                    </div>
                </div>

              <button className="button success round tiny" onClick={this.handleSubmit}>Update</button>
              </fieldset>
            </form>
            </div>
          </div>
      );
    } else {
    return (
        <div className="row user-profile">
          <div className="small-10 columns">
            <h1 className="user-title">{user.first_name} {user.last_name}</h1>
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
                  <input type="text" value={user.email} placeholder="Email" />
                </div>
            </div>

            <div className="row collapse">
                <div className="small-2 columns">
                  <span className="prefix">Password</span>

                </div>
                <div className="small-10 columns">
                  <input type="password" value={user.password} placeholder="Password" />
                </div>
            </div>

            <div className="row collapse">
                <div className="small-2 columns">
                  <span className="prefix">Organization</span>

                </div>
                <div className="small-10 columns">
                  <input type="text" value={user.organization} placeholder="Organization" />
                </div>
            </div>

            <div className="row collapse">
                <div className="small-2 columns">
                  <span className="prefix">Phone</span>

                </div>
                <div className="small-10 columns">
                  <input value={user.phone} placeholder="Phone Number" />
                </div>
            </div>

            <button className="button alert round tiny" onClick={this.handleEdit}>Edit</button>
            </fieldset>
          </form>
          </div>
        </div>

    );
  }
  }
});
export default UserProfile;
