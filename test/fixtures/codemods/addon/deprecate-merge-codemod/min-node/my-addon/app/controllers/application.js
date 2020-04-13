import Ember from 'ember';
import { assign } from '@ember/polyfills';

export default Ember.Controller.extend({
  actions: {
    foo() {
      let a = { first: 'Yehuda' };
      let b = { last: 'Katz' };
      assign(a, b);
    }
  }
});
