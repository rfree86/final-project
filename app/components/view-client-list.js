import React from 'react';
import store from '../store';
import Client from '../models/client';
import { Link } from 'react-router';
import BackboneMixin from '../mixins/backbone';


const ViewClientList = React.createClass({
  mixins: [BackboneMixin],


  componentWillMount() {
    store.fetchClients();
  },

  getModels() {
    return {
      clients: store.getClients()
    }
  },

  render() {
    var clients = this.state.clients;

    return (
      <div>
        <h1>Clients</h1>
        <ul>
          {clients.map((c, i) => {
          return (<li key={c.objectId || i}>
            <Link to={`/clients/${c.objectId}`}>{c.last_name}, {c.first_name}, {c.middle_initial}</Link>
          </li>);
        })}
        </ul>
      </div>
    )
  }

});
export default ViewClientList;
