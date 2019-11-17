import Ember from 'ember';
import { computed } from '@ember/object';

export default Ember.Controller.extend({
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
});
