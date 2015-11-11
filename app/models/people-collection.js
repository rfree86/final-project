import Client from './client';

var PeopleCollection = Backbone.Collection.extend({
  model: Client,

  //look at the first and last name attribute in the Client class of Parse for anything matching the search value.
  url() {
      return (
        "https://api.parse.com/1/classes/client?where=" + JSON.stringify({
          $or: [
            {"first_name": {$regex: this.search}},
            {"last_name": {$regex: this.search}}
          ]
        })
      )
  },
  //list the information based off their last name
  comparator: 'last_name',

//the value needed to preform the search
  setSearch(search) {
    this.search = search;
  },


  parse(response) {
    return response.results;
  }
});

export default PeopleCollection;
