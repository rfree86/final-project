import React from 'react';
import store from '../store';
import { Link } from 'react-router';
import { History } from 'react-router';
import BackboneMixin from '../mixins/backbone';
import NewClient from './create';


const ViewClient = React.createClass({
  mixins: [History, BackboneMixin],

  getInitialState() {
    return {
      isEditing: false
    };
  },

  getModels() {
    return {
      client: store.getClient(this.props.params.id),
      assistance: store.getAssistanceForClient(this.props.params.id)
    };
  },

  handleEdit() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  },

  render() {

    let client = this.state.client;
    let assistance = this.state.assistance;

    return (
      <div>
        <h4>Name: {client.first_name} {client.middle_initial} {client.last_name}</h4>
        <h6>Date of Birth: {client.dob}</h6>
        <h6>Best Phone Number: {client.phone}</h6>
        <h6>Gender: {client.gender}</h6>
        <h6>Marital Status: {client.marital}</h6>
        <h6>Education: {client.education}</h6>
        <h6>Employment: {client.employement}</h6>
          <ul>
            {assistance.map((a, i)=>{
              return (<li>{a.content}</li>);
            })}
          </ul>

      </div>
    );
  }

});

export default ViewClient;
