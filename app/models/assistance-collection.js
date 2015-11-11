import Assistance from './assistance';
import moment from 'moment';

var AssistanceCollection = Backbone.Collection.extend({
  model: Assistance,
  url() {

//this returns the asst class that only includes a specific clientID in the pointer client.
//it pulls only the object related to that certain client.
    return "https://api.parse.com/1/classes/asst?include=creator,client&where=" + JSON.stringify({
      client: {
        __type: "Pointer",
        className: "client",
        objectId: this.clientId
      }
    });
  },
//allows me to organize the ID's according to their createdAt value and sort them in the view-client page
  comparator: function(m) {
  var time =  moment(m.get('createdAt')).format('MMMM Do YYYY, h:mm:ss a');

    return time;
  },
//jake's code
initialize(models, options) {
  this.clientId = options && options.clientId;
},

  parse(response) {
    return response.results;
  }
});

export default AssistanceCollection;
