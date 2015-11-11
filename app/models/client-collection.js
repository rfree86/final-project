import Client from './client';

var ClientCollection = Backbone.Collection.extend({
  model: Client,
  url: "https://api.parse.com/1/classes/client",

  //have the clients listed in alaphabetical order according to their last name
  comparator: 'last_name',



  parse(response) {
    return response.results;
  }
});

export default ClientCollection;
