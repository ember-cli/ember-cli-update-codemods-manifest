import Ember from 'ember';

export default Ember.Controller.extend({
  valueObserver: observer('value', function() {
    // Executes whenever the "value" property changes
  })
});
