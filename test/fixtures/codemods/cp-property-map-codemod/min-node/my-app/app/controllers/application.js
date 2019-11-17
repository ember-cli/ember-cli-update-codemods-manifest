import Ember from 'ember';
import { map } from '@ember/object/computed';

export default Ember.Controller.extend({
  friendNames: map('friends', ['nameKey'], function(friend) {
    return friend[this.nameKey];
  })
});
