import Client from './client';

var ClientCollection = Backbone.Collection.extend({
  model: Client,
  url: "https://api.parse.com/1/classes/client",
  parse(response) {
    return response.results;
  }
});

export default ClientCollection;
