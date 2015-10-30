import _ from 'underscore';
import Backbone from 'backbone';
import Session from './models/session';
import Client from './models/client';
import ClientCollection from './models/client-collection';
import Assistance from './models/assistance';
import AssistanceCollection from './models/assistance-collection';
import User from './models/user';

let session = new Session();
let clients = new ClientCollection();
let assistanceCache = {};


const Store = _.extend({}, Backbone.Events, {

  initialize() {
    this.listenTo(clients, 'add change remove',
  this.trigger.bind(this, 'change'));
    this.listenTo(session, 'change', this.trigger.bind(this, 'change'));
  },

  createClient(attributes) {
    let client = new Client(attributes);
},
  getClients() {
    return clients.toJSON();
  },

  fetchClients() {
    return clients.fetch();
  },
//do something if id doesn't exist
  getClient(id) {
    let client = clients.get(id);
    if(client) {
      return client.toJSON();
    } else {
      clients.fetch();
      return{};
    }
  },

  saveClient(client, options) {
    return clients.create(client, options);
  },

  invalidateSession() {
    return session.invalidate();
  },

  getSession() {
    return session.toJSON();
  },

  authenticateSession(options) {
    return session.authenticate(options);
 },

  restoreSession() {
    return session.restore();
  },

//this user should become the currentUser, instead of
  createUser(attributes) {
    let user = new User(attributes);
    return user.save().then(()=> {
      return sessioin.authenticate({sessionToken:
user.get('sessionToken')});
    });
  },

  getAssistanceForClient(id) {
    let assistances = (assistanceCache[id] = assistanceCache[id] || new
    AssistanceCollection(null, {clientId: id}));
    this.stopListening(assistances);
    this.listenTo(assistances, 'add remove change', this.trigger.bind(this, 'change'));
    return assistances.toJSON();
  },

  fetchAssistanceForClient(id) {
    let assistances = (assistanceCache[id] = assistanceCache[id] || new
    AssistanceCollection(null, {clientId: id}));
    this.stopListening(assistances);
    this.listenTo(assistances, 'add remove change', this.trigger.bind(this, 'change'));
    return assistances.fetch();
  },

  assistanceOnClient(id, assistance) {
    let assistances = (assistanceCache[id] = assistancCache[id] || new
    AssistanceCollection(null, {recipeId: id}));
      this.stopListening(assistances);
      this.listenTo(assistances, 'add remove change',
    this.trigger.bind(this, 'change'));
      assistances.create({
        client: new Client({objectId: id}),
        content: assistance
      });
  }

});

Store.initialize();

export default Store;
