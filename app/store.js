import _ from 'underscore';
import Backbone from 'backbone';
import Session from './models/session';
import Client from './models/client';
import ClientCollection from './models/client-collection';
import Assistance from './models/assistance';
import AssistanceCollection from './models/assistance-collection';
import User from './models/user';
import Bulletin from './models/bulletin';
import BulletinCollection from './models/bulletin-collection';
import PeopleCollection from './models/people-collection';
import UsersCollection from './models/users-collection';

let session = new Session();
let clients = new ClientCollection();
let assistanceCache = {};
let bulletins = new BulletinCollection();
let people = new PeopleCollection();
let users = new UsersCollection();


const Store = _.extend({}, Backbone.Events, {

  initialize() {
    this.listenTo(clients, 'add change remove',
    this.trigger.bind(this, 'change'));
    this.listenTo(session, 'change', this.trigger.bind(this, 'change'));
    this.listenTo(bulletins, 'add change remove', this.trigger.bind(this, 'change'));
    this.listenTo(people, 'add change remove', this.trigger.bind(this, 'change'));
    this.listenTo(users, 'add change remove', this.trigger.bind(this, 'change'));

  },

  getBulletins() {
    return bulletins.toJSON();
  },

  fetchBulletins() {
    return bulletins.fetch();
  },

  createBulletins(data) {
    bulletins.create(data)
  },

//takes the search value from Search.js and calls the peopleCollection
  searchPeople(search) {
    people.setSearch(search);
    people.fetch();
  },

  getPeople() {
    return people.toJSON();
  },

  createClient(attributes) {
    return clients.create(attributes);
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
//not sure if I am even using this//
  saveClient(client, options) {
      options = _.extend({}, options, {merge: true});
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
      return session.authenticate({sessionToken:
user.get('sessionToken')});
    });
  },

  saveUser(user, options) {
    options = _.extend({}, options, {merge: true});
    return users.create(user, options);
  },

  getUser(id) {
    let user = users.get(id);
    if(user) {
      return user.toJSON();
    } else {
      users.fetch();
      return {};
    }
  },

//This was copied from my Instructor's code from his application
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
    this.listenTo(assistances, 'add remove change sort', this.trigger.bind(this, 'change'));
    assistances.sort('-createdAt');
    return assistances.fetch();
  },
//creates a new model of assistance on Parse with the required attributes
  assistanceOnClient(id, assistance) {
    let assistances = (assistanceCache[id] = assistanceCache[id] || new
    AssistanceCollection(null, {clientId: id}));
      this.stopListening(assistances);
      this.listenTo(assistances, 'add remove change',
    this.trigger.bind(this, 'change'));
      assistances.create({
        client: new Client({objectId: id}),
        content: assistance.content,
        location: assistance.location,
        name: assistance.name,
        event_date: assistance.event_date,
      });
  }

});

Store.initialize();

export default Store;
