import React from 'react';
import { Link } from 'react-router';
import store from '../store';
import Client from '../models/client';
import AssistanceCollection from '../models/assistance-collection';
import { History } from 'react-router';


const ViewClient = React.createClass({
  propTypes:{

  },
  mixins: [History],

  componentWillMount() {
    let clientId = this.props.params.id;

    let client = new Client({objectId: clientId});
    client.fetch();

    let assistance = new AssistanceCollection({clientId: clientId});
    assistance.fetch();
  },

  render() {

    let client = this.props.client.toJSON();
    let assistance = this.props.assitance.toJSON();
    return (
      <div>
        <h1>{client.first_name}</h1>
      </div>
    );
  }

});

export default ViewClient;
