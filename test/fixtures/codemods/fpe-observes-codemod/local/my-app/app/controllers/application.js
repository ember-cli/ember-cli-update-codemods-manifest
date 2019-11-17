import Ember from 'ember';

export default Ember.Controller.extend({
  valueObserver: function() {
    // Executes whenever the "value" property changes
  }.observes('value')
});
