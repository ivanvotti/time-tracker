import Ember from 'ember';

const { sort } = Ember.computed;

export default Ember.Component.extend({
  timeEntries: null,
  timeEntriesSorting: ['startedAt:desc'],

  sortedTimeEntries: sort('timeEntries', 'timeEntriesSorting'),
});
