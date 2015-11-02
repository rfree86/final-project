import _ from 'underscore';
import store from '../store';
import User from './user';
import Backbone from 'backbone';

const Bulletin = Backbone.Model.extend({
  idAttribute: 'objectId',
//give the creator an inital empty object
  defaults(){
    return {
      creator: {toJSON: ()=>{}},
    }
  },

  parse(response) {
    response.creator = new User(_.omit(response.creator, '__type', 'className'), {parse: true});
    return response;
  },

  toJSON(options) {
  if(options) {
  
    return _.extend({}, this.attributes, {
      creator: {
        "__type": "Pointer",
        "className": "_User",
        "objectId": this.get('creator').id
      }
    });
  } else {
    return _.extend({}, this.attributes, {
      creator: this.get('creator').toJSON()
    });
  }
},

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
export default Bulletin;
