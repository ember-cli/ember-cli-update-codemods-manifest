import Model, { attr as thing } from '@ember-data/model';

export default Model.extend({
  shoe: thing('number'),
  glass: thing('string')
});
