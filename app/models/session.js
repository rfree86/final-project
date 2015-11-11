import $ from 'jquery'
import Backbone from 'backbone';
import User from './user';
import store from '../store';


//This Code was copied from my instructors code on his applicatioin.
//it compares the info submited by the user with the existing objects in the USER class on Parse
//if true it will set a session token and allow autherization whereever it is required in the application.
const Session = Backbone.Model.extend({
  authenticate(options) {
      if (options.username && options.password) {
        return $.ajax({
          url: "https://api.parse.com/1/login",
          data: {
            username: options.username,
            password: options.password
          }
        }).then((response) => {
          this.set('currentUser', new User(response));
          localStorage.setItem('parse-session-token', response.sessionToken);
          return true;
        }, () => false);
      } else if (options.sessionToken) {
        // I'm authenticating with a sessionToken
        localStorage.setItem('parse-session-token', options.sessionToken);
        var user = new User(options);
        this.set('currentUser', user);
        return $.ajax('https://api.parse.com/1/users/me').then((response) => {
          this.set('currentUser', new User(response));
          return true;
        }, () => false);
      } else {
        console.error("Invalid arguments to authenticate");
        var dfd = new $.Deferred();
        dfd.reject("Invalid arguments to authenticate");
        return dfd.promise();
      }
    },

    restore() {
      var token = localStorage.getItem('parse-session-token');
      if (token) {
        this.authenticate({
          sessionToken: token
        });
      }
    },
//allows the user to logout of the session.
    invalidate() {
      localStorage.removeItem('parse-session-token');
      window.location.reload();
    },

    toJSON() {
      return {
        currentUser: this.get('currentUser') && this.get ('currentUser').toJSON(),
        isAuthenticated: !!this.get('currentUser')
      };
    }
});
export default Session;
