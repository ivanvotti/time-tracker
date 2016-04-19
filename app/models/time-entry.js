import DS from 'ember-data';
import Model from 'ember-pouch/model';

const { attr, hasMany } = DS;

export default Model.extend({
  name: attr('string'),
  duration: attr('number'),
  startedAt: attr('date'),
  stoppedAt: attr('date'),
  tags: hasMany('tag')
});
