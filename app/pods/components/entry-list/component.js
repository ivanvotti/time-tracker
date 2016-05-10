import Component from 'ember-component';
import { sort } from 'ember-computed';

export default Component.extend({
  timeEntries: null,
  timeEntriesSorting: ['startedAt:desc'],

  sortedTimeEntries: sort('timeEntries', 'timeEntriesSorting'),
});
