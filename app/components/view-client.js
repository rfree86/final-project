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

  componentWillMount() {
    store.fetchAssistanceForClient(this.props.params.id);
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

  handleAssistance(e) {
    e.preventDefault();
    store.assistanceOnClient(this.props.params.id,
    this.refs.assistance.value);
      this.refs.assistance.value = '';
  },

  render() {

    let client = this.state.client;
    let assistance = this.state.assistance;

    return (
      <div>
        <ul>
        <h4>Name: {client.first_name} {client.middle_initial} {client.last_name}</h4>
        <h6>Date of Birth: {client.dob}</h6>
        <h6>Best Phone Number: {client.phone}</h6>
        <h6>Gender: {client.gender}</h6>
        <h6>Marital Status: {client.marital}</h6>
        <h6>Education: {client.education}</h6>
        <h6>Employment: {client.employement}</h6>
        </ul>
        <dl className="sub-nav">
          <dt>Assistance</dt>
            <dd className="active"><Link to={"/clients/" + this.props.params.id}>All</Link></dd>
            <dd><Link to={"/clients/" + this.props.params.id + "/assistance"}><i className="fa fa-plus-square"></i></Link>Add Assistance</dd>
        </dl>
        {this.props.children}
        <ul>

            {assistance.map((a, i)=> <li key={a.objectId}>{a.content}</li>
        )}
          </ul>

      </div>
    );
  }

});

export default ViewClient;
