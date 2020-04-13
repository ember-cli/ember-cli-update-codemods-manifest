import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    foo(object) {
      this.doStuff(object);
      Ember.notifyPropertyChange(object, 'someProperty');

      this.doStuff(object);
      object.notifyPropertyChange('someProperty');
    }
  }
});
