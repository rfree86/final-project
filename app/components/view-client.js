import React from 'react';
import store from '../store';
import { Link } from 'react-router';
import { History } from 'react-router';
import BackboneMixin from '../mixins/backbone';
import NewClient from './create';


const ViewClient = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },

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
        <table>
          <thead>
            <tr>
              <th>Information for {client.first_name} {client.middle_initial} {client.last_name}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
        <td>Date of Birth: {client.dob}</td>
        <td>Best Phone Number: {client.phone}</td>
        <td>Gender: {client.gender}</td>
          </tr>

          <tr>
        <td>Marital Status: {client.marital}</td>
        <td>Education: {client.education}</td>
        <td>Employment: {client.employement}</td>
         </tr>
        </tbody>
      </table>

        <dl className="sub-nav">
          <dt>Assistance</dt>
            <dd className="active"><Link to={"/clients/" + this.props.params.id}>All</Link></dd>
            <dd><Link to={"/clients/" + this.props.params.id + "/assistance"}><i className="fa fa-plus-square"></i></Link>Add Assistance</dd>
        </dl>

        {this.props.children}
        <ul className="accordion" data-accordion>

            {assistance.map((a, i)=>
              <li key={a.objectId} className="accordion-navigation">{a.name}
                <div className="content active">
                  <p>{a.content}</p>
                  {a.location}<br />
                  {a.event_date}
                </div>

                </li>
        )}
          </ul>

      </div>
    );
  }

});

export default ViewClient;
