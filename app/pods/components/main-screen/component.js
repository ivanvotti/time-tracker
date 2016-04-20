import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { filterBy, sort } = Ember.computed;

export default Ember.Component.extend({
  timeEntries: null,
  timeEntriesSorting: ['startedAt:desc'],

  stoppedTimeEntries: filterBy('timeEntries', 'isStopped', true),
  sortedStoppedTimeEntries: sort('stoppedTimeEntries', 'timeEntriesSorting'),

  @computed('timeEntries.@each.isStopped')
  currentTimer(timeEntries) {
    return timeEntries && timeEntries.findBy('isStopped', false);
  },

  actions: {
    async startNewTimer(timeEntryName) {
      let currentTimer = this.get('currentTimer');

      if (currentTimer) {
        await this.attrs.stopTimeEntry(currentTimer);
      }

      return this.attrs.addTimeEntry(timeEntryName);
    }
  }
});
