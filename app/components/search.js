import React from 'react';
import { Link } from 'react-router';
import store from '../store';
import BackboneMixin from '../mixins/backbone';
import { History } from 'react-router';

const Search = React.createClass({

  mixins: [History, BackboneMixin],

  getModels() {
    return {
      people: store.getPeople()
    }
  },

  handleCancel(e) {
    e.preventDefault();
    this.history.goBack();
  },

  handleSubmit(e) {
    e.preventDefault();
    let search = (this.refs.search.value).toUpperCase();
    store.searchPeople(search);
  },

  render() {
    return (
      <div>
        <h1>Search Clients</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="search" ref="search" placeholder="search name" />
              <div className="button-bar">
                <ul className="button-group round">
                  <li><button className="button success tiny" type="submit">Submit</button></li>
                </ul>

                <ul className="button-group round">
                  <li><button className="button alert tiny" onClick={this.handleCancel}>Cancel</button></li>
                </ul>
              </div>
          </form>



          <ul>
            {this.state.people.map((c) =>{
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
