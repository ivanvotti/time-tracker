import Ember from 'ember';

const { sort } = Ember.computed;

export default Ember.Component.extend({
  timeEntries: null,
  classNames: ['c-time-entry-list'],
  timeEntriesSorting: ['startedAt:desc'],

  sortedTimeEntries: sort('timeEntries', 'timeEntriesSorting'),
});
