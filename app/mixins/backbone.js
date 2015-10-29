import Backbone from 'backbone';
import _ from 'underscore';
import store from '../store';

const BackboneMixin = _.extend({}, Backbone.Events, {
  //what are the models? and what are they doing?
  //anwser..return an object with data that you need for that component
  _getUpdatedState() {
    return (this.getModels && this.getModels()) || null;
  },

  getInitialState() {
    return this._getUpdatedState();
  },

  componentWillMount() {
    this.listenTo(store, 'change', ()=> {
      let state = this._getUpdatedState();
      state && this.setState(state);
    });
  },

  componetWillUnmount() {
    this.stopListening();
  }

});

export default BackboneMixin;
