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
  endedAt: attr('date'),
  tags: hasMany('tag'),

  isEnded: notEmpty('endedAt'),

  @computed('duration')
  durationDisplay(duration) {
    return formatDuration(duration);
  },

  @computed('startedAt', 'endedAt')
  startedEndedDisplay(startedAt, endedAt) {
    let startedAtDisplay = moment(startedAt).format('h:mm a');
    let endedAtDisplay = 'now';

    if (endedAt) {
      endedAtDisplay = moment(endedAt).format('h:mm a');
    }

    return `${startedAtDisplay} – ${endedAtDisplay}`;
  },

  @computed('startedAt')
  startedAtDisplay(startedAt) {
    return moment(startedAt).format('dddd, MMMM Do');
  }
});
