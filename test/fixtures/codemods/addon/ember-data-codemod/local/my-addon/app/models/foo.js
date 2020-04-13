import DS from 'ember-data';

const {
  attr: thing
} = DS;

export default DS.Model.extend({
  shoe: thing('number'),
  glass: DS.attr('string')
});
