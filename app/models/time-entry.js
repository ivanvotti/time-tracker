import Ember from 'ember';
import DS from 'ember-data';
import computed from 'ember-computed-decorators';
import Model from 'ember-pouch/model';
import moment from 'moment';
import formatDuration from 'time-tracker/utils/format-duration';

const { notEmpty } = Ember.computed;
const { attr, hasMany } = DS;

export default Model.extend({
  name: attr('string'),
  duration: attr('number'),
  startedAt: attr('date'),
  stoppedAt: attr('date'),
  tags: hasMany('tag'),

  isStopped: notEmpty('stoppedAt'),

  @computed('duration')
  durationDisplay(duration) {
    return formatDuration(duration);
  },

  @computed('startedAt', 'stoppedAt')
  startedStoppedDisplay(startedAt, stoppedAt) {
    let startedAtDisplay = moment(startedAt).format('h:mm a');
    let stoppedAtDisplay = 'now';

    if (stoppedAt) {
      stoppedAtDisplay = moment(stoppedAt).format('h:mm a');
    }

    return `${startedAtDisplay} – ${stoppedAtDisplay}`;
  },

  @computed('startedAt')
  startedAtDisplay(startedAt) {
    return moment(startedAt).format('dddd, MMMM Do');
  }
});
