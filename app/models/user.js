import Backbone from 'backbone';

const User = Backbone.Model.extend({
  idAttribute: 'objectId',

  urlRoot: "https://api.parse.com/1/users"


});

export default User;
