import Ember from 'ember';
import { computed } from '@ember/object';

export default Ember.Controller.extend({
  fullName: computed(function() {
    return `${this.firstName} ${this.lastName}`;
  }).property('firstName', 'lastName')
});
