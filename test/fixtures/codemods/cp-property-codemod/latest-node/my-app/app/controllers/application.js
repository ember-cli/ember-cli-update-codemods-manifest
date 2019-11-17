import Ember from 'ember';
import { computed } from '@ember/object';

export default Ember.Controller.extend({
  fullName: computed('firstName', 'lastName', function() {
    return `${this.firstName} ${this.lastName}`;
  })
});
