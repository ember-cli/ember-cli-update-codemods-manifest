import Ember from 'ember';
import { merge } from '@ember/polyfills';

export default Ember.Controller.extend({
  actions: {
    foo() {
      let a = { first: 'Yehuda' };
      let b = { last: 'Katz' };
      merge(a, b);
    }
  }
});
