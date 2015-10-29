import React from 'react';
import store from '../store';
import { Link } from 'react-router';

const NewClient = React.createClass({
  getInitialState(){
    return {
      client: {}
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    var client = store.createClient({
       first_name: this.refs.first_name.value,
       last_name: this.refs.last_name.value,
       dob: new Date(this.refs.dob.value),
       phone: this.refs.phone.value,
       gender: this.refs.gender.value,
       marital: this.refs.marital.value,
       education: this.refs.education.value,
       employement: this.refs.employement.value,

    });

    // theClient = new Client({first_name, last_name, dob, phone, gender, marital, education, employement});

  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>New Client</h1>
        <input type="text" ref="first_name" placeholder="First Name" />
        <input type="text" ref="last_name" placeholder="Last Name" />
        <input type="date" ref="dob" placeholder="Date of Birth" />
        <input type="text" ref="phone" placeholder="Phone Number" />

        <label>Gender</label>
        <select name="select" ref="gender">
          <option>Male</option>
          <option>Female</option>
        </select>

        <label>Marital Status</label>
        <select name="select" ref="marital">
          <option>Single</option>
          <option>Married</option>
          <option>Divorced</option>
          <option>Seperated</option>
          <option>Widow</option>
        </select>

        <label>Education</label>
        <select name="select" ref="education">
          <option>High School</option>
          <option>Associates</option>
          <option>Tech School</option>
          <option>Bachelors</option>
          <option>Masters</option>
          <option>Doctorate</option>
        </select>

        <label>Employement</label>
        <select name="select" ref="employement">
          <option>Student</option>
          <option>Unemployed</option>
          <option>Part-Time</option>
          <option>Full-Time</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    )
  }
})

export default NewClient;
