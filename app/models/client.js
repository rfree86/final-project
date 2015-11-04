import store from '../store';
import User from './user';
import _ from 'underscore';
import moment from 'moment';

var Client = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: "https://api.parse.com/1/classes/client",

  url: function() {
    var base = _.result(this, 'urlRoot');
    if (this.isNew()) return base;
    var id = this.get(this.idAttribute);
    return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id) + "?include=creator";
  },
//return today's date if no dob was entered
  defaults() {
    return {
      dob: new Date()
    }
  },
//convert iso to data object that can be rendered on the page
parse(response) {
  var dob = (response.dob && new Date(response.dob.iso));
  response.dob = moment(dob).format('YYYY-MM-DD')
  return response
},

  toJSON(options) {
    // I'm saving the model
    if(options) {
      var dob = new Date(this.get('dob'));
      return _.extend({}, this.attributes, {
        dob: {
          "__type": "Date",
          "iso": dob.toISOString()
        }
      });
    // I'm using toJSON to use with React
    } else {
      return _.extend({}, this.attributes, {});
    }
  },

});

export default Client;
