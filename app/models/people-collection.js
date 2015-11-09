import Client from './client';

var PeopleCollection = Backbone.Collection.extend({
  model: Client,
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
  comparator: 'last_name',

  setSearch(search) {
    this.search = search;
  },


  parse(response) {
    return response.results;
  }
});

export default PeopleCollection;
