import React from 'react';
import store from '../store';
import Client from '../models/client';
import { Link } from 'react-router';


const ViewClientList = React.createClass({
  propTypes: {
    client: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      client: store.getClientCollection()
    }
  },

  componentWillMount() {
    this.props.client.fetch();
    this.props.client.on('sync add remove', null, this);
  },

  componentWiilUnMount() {
    this.props.client.off('sync add remove', null, this);
  },

  render() {
    var client = this.props.client.toJSON();

    return (
      <div>
        <ul>
          {client.map((c) =>
          <li key={c.objectId}>
            <Link to={`client/${c.objectId}`}>{c.last_name}, {c.first_name}, {c.middle_initial}</Link>
          </li>
        )}
        </ul>
      </div>
    )
  }

});
export default ViewClientList;
