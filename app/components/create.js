import React from 'react';
import store from '../store';
import { Link } from 'react-router';

const NewCase = React.createClass({
  getInitialState(){
    return {
      theCase: store.getNewCase()
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    var theCase = store.getCaseCollection().create({
       first_name: this.refs.first_name.value,
       last_name: this.refs.last_name.value,
       dob: new Date(this.refs.dob.value),
       phone: this.refs.phone.value,
       gender: this.refs.gender.value,
       marital: this.refs.marital.value,
       education: this.refs.education.value,
       employement: this.refs.employement.value,

    });
    // theCase = new Case({first_name, last_name, dob, phone, gender, marital, education, employement});

  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>New Case</h1>
        <input type="text" ref="first_name" placeholder="First Name" />
        <input type="text" ref="last_name" placeholder="Last Name" />
        <input type="date" ref="dob" placeholder="Date of Birth" />
        <input type="text" ref="phone" placeholder="Phone Number" />
        <input type="text" ref="gender" placeholder="Gender" />
        <input type="text" ref="marital" placeholder="Marital Status" />
        <input type="text" ref="education" placeholder="Education" />
        <input type="text" ref="employement" placeholder="Employement" />
        <button type="submit">Submit</button>
      </form>
    )
  }
})

export default NewCase;
