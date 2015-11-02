import React from 'react';
import store from '../store';
import { Link } from 'react-router';
import { History } from 'react-router';

const NewAssistance = React.createClass({
  mixins: [ History ],
  render () {
    console.log(this.props.params);
    return (
  <div className="row">
    <div className="small-10 columns">
    <form>
      <fieldset>
      <legend>New Assistance</legend>
      <input type="date" ref="" placeholder="date" />
      <input type="text" ref="" placeholder="location" />
      <textarea cols="30" rows="10" ref="content" placeholder="describe event here" />
      <button type="submit">Submit</button>
      </fieldset>
    </form>
    </div>
  </div>
  )
  }

});
export default NewAssistance;
