import React from 'react';
import store from '../store';
import { Link } from 'react-router';
import { History } from 'react-router';

const NewClient = React.createClass({
  mixins: [ History ],

//set the initial state of the new client to an empty object
  getInitialState(){
    return {
      client: {}
    };
  },

  //set the value for each attribute and then reroute the screen to the client list page
  handleSubmit(e) {
    e.preventDefault();
    var client = store.createClient({
       first_name: (this.refs.first_name.value).toUpperCase(),
       last_name: (this.refs.last_name.value).toUpperCase(),
       dob: new Date(this.refs.dob.value),
       phone: this.refs.phone.value,
       gender: this.refs.gender.value,
       marital: this.refs.marital.value,
       education: this.refs.education.value,
       employement: this.refs.employement.value,

    });
this.history.pushState({}, "/clients");
  },

  handleCancel(e) {
    e.preventDefault();
    this.history.goBack();
  },

  render() {
    return (
      <div className="row">
        <div className="small-10 columns">
      <form onSubmit={this.handleSubmit}>
        <fieldset>
        <legend className="legend">New Client</legend>
        <input type="text" ref="first_name" placeholder="First Name" />
        <input type="text" ref="last_name" placeholder="Last Name" />
        <input type="date" ref="dob" placeholder="Date of Birth" />
        <input type="text" ref="phone" placeholder="Phone Number" />

          <div className="row">
            <div className="small-5 columns">
        <label>Gender</label>
        <select name="select" ref="gender">
          <option>Male</option>
          <option>Female</option>
        </select>

        <label>Marital Status</label>
        <select name="select" ref="marital">
          <option>select</option>
          <option>Single</option>
          <option>Married</option>
          <option>Divorced</option>
          <option>Seperated</option>
          <option>Widow</option>
        </select>
        </div>

        <div className="small-5 columns">
        <label>Education</label>
        <select name="select" ref="education">
          <option>select</option>
          <option>High School</option>
          <option>Associates</option>
          <option>Tech School</option>
          <option>Bachelors</option>
          <option>Masters</option>
          <option>Doctorate</option>
        </select>

        <label>Employment</label>
        <select name="select" ref="employement">
          <option>select</option>
          <option>Student</option>
          <option>Unemployed</option>
          <option>Part-Time</option>
          <option>Full-Time</option>
        </select>
      </div>

          </div>

          <div className="button-bar">
            <ul className="button-group round">
              <li><button className="button success tiny" type="submit">Submit</button></li>
            </ul>

            <ul className="button-group round">
              <li><button className="button alert tiny" onClick={this.handleCancel}>Cancel</button></li>
            </ul>
          </div>

        </fieldset>
      </form>
      </div>
    </div>
    )
  }
})

export default NewClient;
