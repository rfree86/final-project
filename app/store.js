import $ from 'jquery';
import Backbone from 'backbone';
import Session from './models/session';
import Case from './models/case';
import CaseCollection from './models/case-collection';
import AssistanceCollection from './models/assistance-collection';

let session, cases, assistance;
export default {
  getSession(){
    return (session = session || new Session());
  },

  getCaseCollection() {
    return (cases = cases || new CaseCollection());
  },

  getNewCase() {
    return new Case();
  },

  getAssistanceCollection() {
    return (assistance = assistance || new AssistanceCollection());
  }

};
