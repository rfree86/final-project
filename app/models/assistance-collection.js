import Assistance from './assistance';
import moment from 'moment';

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
  comparator: function(m) {
  var time =  moment(m.get('createdAt')).format('MMMM Do YYYY, h:mm:ss a');

    return time;
  },

initialize(models, options) {
  this.clientId = options && options.clientId;
},

  parse(response) {
    return response.results;
  }
});

export default AssistanceCollection;
