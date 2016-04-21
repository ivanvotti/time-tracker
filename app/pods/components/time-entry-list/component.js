import Ember from 'ember';

const { filterBy, sort } = Ember.computed;

export default Ember.Component.extend({
  timeEntries: null,
  classNames: ['c-time-entry-list'],
  timeEntriesSorting: ['startedAt:desc'],

  stoppedTimeEntries: filterBy('timeEntries', 'isStopped', true),
  sortedStoppedTimeEntries: sort('stoppedTimeEntries', 'timeEntriesSorting'),
});
