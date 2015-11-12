import React from 'react';
import store from '../store';
import { Link } from 'react-router';
import { History } from 'react-router';
import BackboneMixin from '../mixins/backbone';
import update from 'react-addons-update';
import moment from 'moment';


const EditClient = React.createClass({
  propTypes: {
    params: React.PropTypes.object,
    initialClient: React.PropTypes.object,
    onSave: React.PropTypes.func
  },

  mixins: [History, BackboneMixin],

//get the attribute values for this specific client and mount on the page in their spefic input boxes
  getModels() {
    return {
      client: store.getClient(this.props.params.id)
    }
  },
//this code is based off instructors application.  resets the value of the changed information
//and creates a new copy of the object in parse using "update".  Any client information changed is saved even if submit is not clicked.
  handleChange(prop, e) {
    let newState = {};
    newState[prop] = {
      $set: e.target.value
    };

    this.setState({
      client: update(this.state.client, newState)
    });
  },
//saves the recent copy of the clients information and reroutes the screen back to the client's page
  handleSubmit(e) {
    e.preventDefault();
console.log('submit');
    let client = this.state.client;
    store.saveClient(client);

    if(this.props.onSave) {
      this.props.onSave(client);
    } else {
      this.history.pushState({}, "/clients/" + this.props.params.id);
    }
  },

//send the user back to the client's page
  handleCancel(e) {
    e.preventDefault();
    this.history.pushState({}, "/clients/" + this.props.params.id);
  },

  render() {
    let client = this.state.client;
    return (

      <div className="row">
        <div className="small-10 columns">
      <form onSubmit={this.handleSubmit}>
        <fieldset>
        <legend className="legend">Edit Client</legend>
        <input type="text" value={client.first_name} placeholder="First Name" onChange={this.handleChange.bind(this, 'first_name')} />
        <input type="text" value={client.last_name} placeholder="Last Name" onChange={this.handleChange.bind(this, 'last_name')} />
        <input type="date" value={client.dob} placeholder="Date of Birth" onChange={this.handleChange.bind(this, 'dob')} />
        <input type="text" value={client.phone} placeholder="Phone Number" onChange={this.handleChange.bind(this, 'phone')} />

          <div className="row">
            <div className="small-5 columns">
        <label>Gender</label>
        <select name="select" value={client.gender} onChange={this.handleChange.bind(this, 'gender')}>
          <option>Male</option>
          <option>Female</option>
        </select>

        <label>Marital Status</label>
        <select name="select" value={client.marital} onChange={this.handleChange.bind(this, 'marital')}>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="divorced">Divorced</option>
          <option value="seperated">Seperated</option>
          <option value="widow">Widow</option>
        </select>
        </div>

        <div className="small-5 columns">
        <label>Education</label>
        <select name="select" value={client.education} onChange={this.handleChange.bind(this, 'education')}>
          <option value="high school">High School</option>
          <option value="associates">Associates</option>
          <option value="tech school">Tech School</option>
          <option value="bachelors">Bachelors</option>
          <option value="masters">Masters</option>
          <option value="doctorate">Doctorate</option>
        </select>

        <label>Employment</label>
        <select name="select" value={client.employement} onChange={this.handleChange.bind(this, 'employement')}>
          <option value="student">Student</option>
          <option value="unemployed">Unemployed</option>
          <option value="part-time">Part-Time</option>
          <option value="full-time">Full-Time</option>
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
    );
  }

});

export default EditClient;
