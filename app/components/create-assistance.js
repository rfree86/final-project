import React from 'react';
import store from '../store';
import { Link } from 'react-router';
import { History } from 'react-router';

const NewAssistance = React.createClass({
  mixins: [ History ],

//set the initial state of the new assistace event as an empty object
  getInitalState() {
    return {
      assistance: {}
    };
  },

  handleCancel(e) {
    e.preventDefault();
    this.history.goBack();
  },

//set the attribute values of the new Assistance to the store and reroute back to the specific client's page
  handleSubmit(e) {
    e.preventDefault();

  store.assistanceOnClient(this.props.params.id,{
        name: this.refs.name.value,
        event_date: this.refs.event_date.value,
        location: this.refs.location.value,
        content: this.refs.content.value,
    });
    this.history.pushState({}, "/clients/" + this.props.params.id);
  },

  render () {

    return (
  <div className="row">
    <div className="small-10 columns">
    <form onSubmit={this.handleSubmit}>
      <fieldset>
      <legend className="legend">New Assistance</legend>
      <input type="text" ref="name" placeholder="title" />
      <input type="text" ref="event_date" placeholder="date" />
      <input type="text" ref="location" placeholder="location" />
      <textarea cols="30" rows="10" ref="content" placeholder="describe event here" />

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

});
export default NewAssistance;
