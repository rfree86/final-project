import store from '../store';
import _ from 'underscore';
import User from './user';
import Case from './recipe';

const Assistance = Backbone.Model.extend({

  idAttribute: 'objectId',

  default() {
    return {
      case: {toJSON: ()=>{}},
      creator: {toJSON: ()=>{}}
    };
  },

  //get Jake to explain what this means?
  parse(response) {
    response.creator = new User(_.omit(response.creator, '__type', 'className'), {parse: true});
    response.case = new Case(_.omit(response.case, '__type', 'className'), {parse: true});
  },

  toJSON(options) {
    //I'm saving the model
    if(options) {
      return _.extend({}, this.attributes, {
        case: {
          "__type": "Pointer",
          "className": "client",
          "objectId": this.get('case').id
        },
        creator: {
          "__type": "Pointer",
          "className": "_User",
          "objectId": this.get('creator').id
        }
      });
      //I'm using toJSON to get a simple object of attributes
    } else {
      return _.extend({}, this.attributes, {
        case: this.get('case').toJSON(),
        creator: this.get('creator').toJSON()
      });
    }
  }
});
export default Assistance;
