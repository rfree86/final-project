import React from 'react';
import store from '../store';
import { Link } from 'react-router';

const NewAssistance = React.createClass({
  render () {
    return (
    <form>
      <h1>New Assistance</h1>
      <input type="text" ref="" placeholder="" />
      <input type="date" ref="" placeholder="date" />
      <input type="text" ref="" placeholder="location" />
      <textarea cols="30" rows="10" ref="content" placeholder="describe event here" />
      <button type="submit">Submit</button>
    </form>
  )
  }

});
export default NewAssistance;
