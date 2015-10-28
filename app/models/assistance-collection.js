import Assistance from './assistance';

var AssistanceCollection = Backbone.Collection.extend({
  model: Assistance,
  url() {
    //should it be caseId or clientId?
    //am I trying to target the User, or the client/case?
    return "https://api.parse.com/1/classes/asst" + JSON.stringify({
      case: {
        __type: "Pointer",
        className: "Recipe",
        objectId: this.caseId
      }
    });
  },

  initialize(options) {
    this.caseId = options.caseId;
  },

  parse(response) {
    return response.results;
  }
});

export default AssistanceCollection;
