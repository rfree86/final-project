import Assistance from './assistance';

var AssistanceCollection = Backbone.Collection.extend({
  model: Assistance,
  url() {

    return "https://api.parse.com/1/classes/asst?include=creator,client&where=" + JSON.stringify({
      client: {
        __type: "Pointer",
        className: "client",
        objectId: this.clientId
      }
    });
  },

initialize(models, options) {
  this.clientId = options && options.clientId;
},

  parse(response) {
    return response.results;
  }
});

export default AssistanceCollection;
