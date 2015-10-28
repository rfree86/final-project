import Assistance from './assistance';

var AssistanceCollection = Backbone.Collection.extend({
  model: Assistance,
  url() {
    //should it be clientId or clientId?
    //am I trying to target the User, or the client/client?
    return "https://api.parse.com/1/classes/asst?include=creator,client&where=" + JSON.stringify({
      client: {
        __type: "Pointer",
        className: "Recipe",
        objectId: this.clientId
      }
    });
  },

  initialize(options) {
    this.clientId = options.clientId;
  },

  parse(response) {
    return response.results;
  }
});

export default AssistanceCollection;
