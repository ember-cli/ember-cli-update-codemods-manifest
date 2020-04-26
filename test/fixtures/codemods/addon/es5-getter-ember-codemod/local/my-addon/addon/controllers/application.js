import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    foo() {
      this.get('fullName');
    }
  }
});
