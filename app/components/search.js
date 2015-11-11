import React from 'react';
import { Link } from 'react-router';
import store from '../store';
import BackboneMixin from '../mixins/backbone';
import { History } from 'react-router';

const Search = React.createClass({

  mixins: [History, BackboneMixin],
//get people info from client class in parse.
  getModels() {
    return {
      people: store.getPeople()
    }
  },

  handleCancel(e) {
    e.preventDefault();
    this.history.goBack();
  },
//set the value of search and plug it into the peopleCollection url for client class
  handleSubmit(e) {
    e.preventDefault();
    let search = (this.refs.search.value).toUpperCase();
    store.searchPeople(search);
  },

  render() {
    return (
      <div>
        <div className="row">
         <div className="small-12 columns">
          <form onSubmit={this.handleSubmit}>
            <fieldset className="search-field">
              <legend className="search-title">SEARCH CLIENTS</legend>
            <input type="search" ref="search" placeholder="search name" />

              <div className="button-bar">
                <ul className="button-group round">
                  <li><button className="button success tiny" type="submit">Submit</button></li>
                </ul>

                <ul className="button-group round">
                  <li><button className="button alert tiny" onClick={this.handleCancel}>Cancel</button></li>
                </ul>
              </div>

              </fieldset>
          </form>
        </div>
      </div>



          <ul className="client-list">
            {this.state.people.map((c) =>{
              return (<li className="search-results clientListView" key={c.objectId}>
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
