import $ from 'jquery';
import Backbone from 'backbone';
import Session from './models/session';
import Client from './models/client';
import ClientCollection from './models/client-collection';
import AssistanceCollection from './models/assistance-collection';

let session, clients, assistance;
export default {
  getSession(){
    return (session = session || new Session());
  },

  getClientCollection() {
    return (clients = clients || new ClientCollection());
  },

  getNewClient() {
    return new Client();
  },

  getAssistanceCollection() {
    return (assistance = assistance || new AssistanceCollection());
  }

};
