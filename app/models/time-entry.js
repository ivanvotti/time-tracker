import DS from 'ember-data';
import Model from 'ember-pouch/model';

const { attr } = DS;

export default Model.extend({
  title: attr('string'),
  duration: attr('number'),
  startedAt: attr('date'),
  stoppedAt: attr('date')
});
