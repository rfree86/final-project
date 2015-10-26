import $ from 'jquery';

$.ajaxSetup({
  beforeSend(xhr, options) {
    if(options.url.match(/api.parse.com/)) {
      xhr.setRequestHeader('X-Parse-Application-Id', 'vTjisQoI57hbfUqdcdoMa1RHQzN0LQbmDqiRkZld');
      xhr.setRequestHeader('X-Parse-REST-API-Key', 'gOKSI6CV2YNPQAQ1idCWJMVBdqzBDq5XgI0f0Ceq');
      if(localStorage.getItem('parse-session-token')) {
        xhr.setRequestHeader('X-Parse-Session-Token', localStorage.getItem('parse-session-token'));
      }
    }
  }
});
