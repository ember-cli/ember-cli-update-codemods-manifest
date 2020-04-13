import { computed } from '@ember/object';
import Ember from 'ember';

export default Ember.Controller.extend({
  fullName: computed('firstName', 'lastName', function() {
    return `${this.firstName} ${this.lastName}`;
  })
});
