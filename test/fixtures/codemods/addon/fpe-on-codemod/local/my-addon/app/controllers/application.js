import Ember from 'ember';

export default Ember.Controller.extend({
  logCompleted: function() {
    console.log('Job completed!');
  }.on('completed')
});
