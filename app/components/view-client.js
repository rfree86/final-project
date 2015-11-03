import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import store from '../store';
import { Link } from 'react-router';
import { History } from 'react-router';
import BackboneMixin from '../mixins/backbone';
import NewClient from './create';


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
    console.log(this.state.class);
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

        <div className="sectionhead">{this.props.title} <i className="fa fa-caret-down" onClick={this.handleClick}></i>
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

  getInitialState() {
    return {
      isEditing: false,
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

//I am bringing in the Secion component here as a wrapper for the assistance list and inculded css styling 
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

        <div className="main">
          <div className="title">{this.props.name}</div>
          {assistance.map((a) => <Section title={a.name}>
          <p>{a.content}</p>
          {a.location}<br />
          {a.event_date}

          </Section>)}
        </div>

      </div>
    );
  }

});


export default ViewClient;
