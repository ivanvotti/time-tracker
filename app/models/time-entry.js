import Ember from 'ember';
import DS from 'ember-data';
import Model from 'ember-pouch/model';

const { notEmpty } = Ember.computed;
const { attr, hasMany } = DS;

export default Model.extend({
  name: attr('string'),
  duration: attr('number'),
  startedAt: attr('date'),
  stoppedAt: attr('date'),
  tags: hasMany('tag'),

  isStopped: notEmpty('stoppedAt')
});
