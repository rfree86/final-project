import React from 'react';
import store from '../store';
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

  getModels() {
    return {
      client: store.getClient(this.props.params.id)
    }
  },

  handleChange(prop, e) {
    let newState = {};
    newState[prop] = {
      $set: e.target.value
    };

    this.setState({
      client: update(this.state.client, newState)
    });
  },

  handleSubmit(e) {
    e.preventDefault();

    let client = this.state.client;
    store.saveClient(client);

    if(this.props.onSave) {
      this.props.onSave(client);
    } else {
      this.history.pushState({}, '/');
    }
  },

  render() {
    let client = this.state.client;
    return (

      <div className="row">
        <div className="small-10 columns">
      <form onSubmit={this.handleSubmit}>
        <fieldset>
        <legend>Edit Client</legend>
        <input type="text" value={client.first_name} placeholder="First Name" onChange={this.handleChange.bind(this, 'first_name')} />
        <input type="text" value={client.last_name} placeholder="Last Name" onChange={this.handleChange.bind(this, 'last_name')} />
        <input type="date" value={moment(client.dob).format('YYYY-MM-DD')} placeholder="Date of Birth" onChange={this.handleChange.bind(this, 'dob')} />
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
          <option>Single</option>
          <option>Married</option>
          <option>Divorced</option>
          <option>Seperated</option>
          <option>Widow</option>
        </select>
        </div>

        <div className="small-5 columns">
        <label>Education</label>
        <select name="select" value={client.education} onChange={this.handleChange.bind(this, 'education')}>
          <option>High School</option>
          <option>Associates</option>
          <option>Tech School</option>
          <option>Bachelors</option>
          <option>Masters</option>
          <option>Doctorate</option>
        </select>

        <label>Employement</label>
        <select name="select" value={client.employement} onChange={this.handleChange.bind(this, 'employement')}>
          <option>Student</option>
          <option>Unemployed</option>
          <option>Part-Time</option>
          <option>Full-Time</option>
        </select>
      </div>

          </div>

        <button type="submit">Submit</button>
        </fieldset>
      </form>
      </div>
      </div>
    );
  }

});

export default EditClient;
