import React from 'react';
import { Link, } from 'react-router';
import store from '../store';

const Create = React.createClass({

  render() {
    return (
      <form>
        <h1>New Case</h1>
        <input type="text" ref="name" placeholder="Name" />
        <input ref="dob" placeholder="Date of Birth" />
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

export default Create;
