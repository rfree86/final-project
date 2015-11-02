import React from 'react';
import store from '../store';
import { Link } from 'react-router';
import { History } from 'react-router';

const NewAssistance = React.createClass({
  mixins: [ History ],

  getInitalState() {
    return {
      assistance: {}
    };
  },

  handleSubmit(e) {
    e.preventDefault();

  store.assistanceOnClient(this.props.params.id,{
        name: this.refs.name.value,
        event_date: this.refs.event_date.value,
        location: this.refs.location.value,
        content: this.refs.content.value,
    });
  },

  render () {
    console.log(this.props.params);
    return (
  <div className="row">
    <div className="small-10 columns">
    <form onSubmit={this.handleSubmit}>
      <fieldset>
      <legend>New Assistance</legend>
      <input type="text" ref="name" placeholder="title" />
      <input type="text" ref="event_date" placeholder="date" />
      <input type="text" ref="location" placeholder="location" />
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
