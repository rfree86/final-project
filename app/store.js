import $ from 'jquery';
import Backbone from 'backbone';
import Session from './models/session';

let session;
export default {
  getSession(){
    return (session = session || new Session());
  }
};
