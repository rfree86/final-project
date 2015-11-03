import React from 'react';
import { Link } from 'react-router';
import store from '../store';
import BackboneMixin from '../mixins/backbone';
import { History } from 'react-router';

const Search = React.createClass({

  getInitialState() {
    return{
      client: store.getClientCollection()
    }
  },

  componentWillMount() {
    this.state.client.on('change', this.forceUpdate.bind(this, null), this);
  },

  componentWillUnMount() {
    this.state.client.off('change', null, this);
  },

  handleSubmit(e) {
    e.preventDefault();
    this.setState.client = store.getClientCollection([], this.refs.search.value);
      this.state.client.fetch().then(
        ()=> {
          this.setState({
            client: this.state.client
          })
        }
      )
  },

  render() {
    return (
      <div>
        <h1>Search Clients</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="search" ref="search" placeholder="search" />
            <button type="submit">Submit</button>
          </form>

        <ul>
          {this.state.client.toJSON().map((c) =>{
            return (<li className="search-results" key={c.objectId}>
            <Link  to={`/clients/${c.objectId}`}>{c.last_name}, {c.first_name}, {c.middle_initial}</Link>
            <hr />
          </li>);
        })}
        </ul>

      </div>
    )
  }

});
export default Search;
