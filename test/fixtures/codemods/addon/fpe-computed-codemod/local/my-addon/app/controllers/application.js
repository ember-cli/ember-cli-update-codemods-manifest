import Ember from 'ember';

export default Ember.Controller.extend({
  fullName: function() {
    return `${this.firstName} ${this.lastName}`;
  }.property('firstName', 'lastName')
});
