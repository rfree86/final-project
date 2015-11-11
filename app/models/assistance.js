import store from '../store';
import _ from 'underscore';
import User from './user';
import Client from './client';

const Assistance = Backbone.Model.extend({

  idAttribute: 'objectId',

  defaults() {
    return {
      client: {toJSON: ()=>{}},
      creator: {toJSON: ()=>{}}
    };
  },

  //leave this information out of the models when they come back from Parse.(parse:True?)
  parse(response) {
    response.creator = new User(_.omit(response.creator, '__type', 'className'), {parse: true});
    response.client = new Client(_.omit(response.client, '__type', 'className'), {parse: true});
    return response;
  },
//this is based off my instructors code from an application.  It saves the currentUser of the creator
//and the client the model is in reference to.
  toJSON(options) {
    //I'm saving the model
    if(options) {
      return _.extend({}, this.attributes, {
        client: {
          "__type": "Pointer",
          "className": "client",
          "objectId": this.get('client').id
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
        client: this.get('client').toJSON(),
        creator: this.get('creator').toJSON()
      });
    }
  },
//Jake's code
  save() {
    let currentUser = store.getSession().currentUser;
    if(currentUser) {
      if(this.isNew()) {
        this.set('creator', new User(currentUser));
      }
      Backbone.Model.prototype.save.apply(this, arguments);
    } else {
      return new Promise((_, reject) =>("Invalid session"));
    }
  }
});
export default Assistance;
