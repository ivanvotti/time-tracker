import { empty, sort } from 'ember-computed';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Model from 'ember-pouch/model';
import computed from 'ember-computed-decorators';
import moment from 'moment';
import formatDuration from 'time-tracker/utils/format-duration';

export default Model.extend({
  name: attr('string'),
  duration: attr('number'),
  startedAt: attr('date'),
  endedAt: attr('date'),
  tags: hasMany('tag'),

  tagsSorting: ['name'],
  sortedTags: sort('tags', 'tagsSorting'),
  isActive: empty('endedAt'),

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
