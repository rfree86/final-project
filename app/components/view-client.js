import React from 'react';
import ReactDOM from 'react-dom';
import store from '../store';
import { Link } from 'react-router';
import { History } from 'react-router';
import BackboneMixin from '../mixins/backbone';
import NewClient from './create';
import EditClient from './edit-client';
import moment from 'moment';
import _ from 'underscore';



//this component is for the toggle class functionality of the assistnace list
//this component was taken from a codepen session done with my instructor
var Section = React.createClass({

  getInitialState: function(){
     return {
       open: false,
       class: "section"
     }
  },

  handleClick: function(){
    if(this.state.open) {
      this.setState({
        open: false,
        class: "section"
      });
    }else{
      this.setState({
        open: true,
        class: "section open"
      });
    }
  },

  render: function() {
    var assistance = this.state.assistance;
    return (
      <div className={this.state.class}>

        <div className="sectionhead" onClick={this.handleClick}>{this.props.title} {this.props.date} <i className="fa fa-caret-down"></i>
          </div>
        <div className="articlewrap">
          <div className="article">

            {this.props.children}

          </div>
        </div>
      </div>
    );
  }
});

const ViewClient = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },

  mixins: [History, BackboneMixin],

//toggle state for render
  getInitialState() {
    return {
      isEditing: false,
    };
  },

  componentWillMount() {
    store.fetchAssistanceForClient(this.props.params.id);
  },

//get the specific ID from the client class and get the assistance class's ID with the client as the pointer in Parse
  getModels() {
    return {
      client: store.getClient(this.props.params.id),
      assistance: store.getAssistanceForClient(this.props.params.id)
    };
  },
//on click toggle the editing class in render
  handleEdit() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  },
//this saves the new assistance with the clients objectId as its pointer
  handleAssistance(e) {
    e.preventDefault();
    store.assistanceOnClient(this.props.params.id,
    this.refs.assistance.value);
      this.refs.assistance.value = '';
  },

//I am bringing in the Secion component here as a wrapper for the assistance list and inculded css styling
//assistance(var) resorted the assistance collection to display newest to oldest based off the createdAt attribute
  render() {

    let client = this.state.client;
    let assistance = this.state.assistance;
    assistance = _.sortBy(assistance, 'createdAt').reverse();


    if(this.state.isEditing) {
      return <EditClient initialClient={client} onSave={this.handleEdit} />
    }

    return (
      <div className="client-page">
        <table>
          <thead>
            <tr>
              <th>Information for {client.first_name} {client.middle_initial} {client.last_name}</th>
              <th><Link to={"/clients/" + this.props.params.id + "/edit_client"}>Edit Client</Link></th>
            </tr>
          </thead>
          <tbody>
            <tr>
        <td>DATE OF BIRTH: {moment(client.dob).format('MMMM Do YYYY')}</td>
        <td>BEST PHONE NUMBER: {client.phone}</td>
        <td>GENDER: {client.gender}</td>
          </tr>

          <tr>
        <td>MARITAL STATUS: {client.marital}</td>
        <td>EDUCATION: {client.education}</td>
        <td>EMPLOYMENT: {client.employement}</td>
         </tr>
        </tbody>
      </table>

        <dl className="sub-nav">
          <dt className="sub-nav-asst">Assistance</dt>
            <dd className="active"><Link to={"/clients/" + this.props.params.id}>All</Link></dd>
            <dd><Link className="sub-nav-asst" to={"/clients/" + this.props.params.id + "/assistance"}><i className="fa fa-plus-square"></i></Link>Add Assistance</dd>
        </dl>

        {this.props.children}

        <div className="main">
          <div className="title">{this.props.name}</div>
          {assistance.map((a) => <Section title={a.name} date={moment(a.createdAt).format('MM/DD/YY')}>
          <p>{a.content}</p>
          {a.location}<br />
          {a.event_date}
          <span className="asst-creator"><i>Entered By</i>: {a.creator.first_name} {a.creator.last_name} </span><br />
          <span className="asst-creator"><i>Organization</i>: {a.creator.organization}</span>

          </Section>)}
        </div>

      </div>
    );
  }

});


export default ViewClient;
