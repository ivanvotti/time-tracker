import Ember from 'ember';
import DS from 'ember-data';
import computed from 'ember-computed-decorators';
import Model from 'ember-pouch/model';

const { notEmpty } = Ember.computed;
const { attr, hasMany } = DS;

function addZero(value) {
  return value < 10 ? `0${value}` : value;
}

function formatTime(value) {
  let hours = Math.floor(value / 60 / 60);
  let minutes = Math.floor((value - (hours * 60 * 60)) / 60);
  let seconds = Math.round(value - (hours * 60 * 60) - (minutes * 60));

  return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
}

export default Model.extend({
  name: attr('string'),
  duration: attr('number'),
  startedAt: attr('date'),
  stoppedAt: attr('date'),
  tags: hasMany('tag'),

  isStopped: notEmpty('stoppedAt'),

  @computed('duration')
  durationDisplay(duration) {
    return formatTime(duration);
  }
});
