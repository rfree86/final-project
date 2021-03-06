import React from 'react';
import store from '../store';
import Client from '../models/client';
import { Link } from 'react-router';
import BackboneMixin from '../mixins/backbone';
import { History } from 'react-router';


const ViewClientList = React.createClass({
  mixins: [History, BackboneMixin],

//get the client collection from the store
  componentWillMount() {
    store.fetchClients();
  },
//get the client class array from parse
  getModels() {
    return {
      clients: store.getClients()
    }
  },

  render() {
    var clients = this.state.clients;

    return (
      <div>
        <dl className="sub-nav">
          <dt>Clients</dt>
            <dd className="active"><Link to="/clients">All</Link></dd>
            <dd><Link to={"/search"}><i className="fa fa-search"></i></Link>Search</dd>
        </dl>
        <h1 className="clients">Clients</h1>
        <ul className="client-list">
          {clients.map((c, i) => {
          return (<li className="clientListView" key={c.objectId || i}>
            <Link  to={`/clients/${c.objectId}`}>{c.last_name}, {c.first_name}, {c.middle_initial}</Link>
            <hr />
          </li>);
        })}
        </ul>
      </div>
    )
  }

});
export default ViewClientList;
