import { on } from '@ember/object/evented';
import Ember from 'ember';

export default Ember.Controller.extend({
  logCompleted: on('completed', function() {
    console.log('Job completed!');
  })
});
