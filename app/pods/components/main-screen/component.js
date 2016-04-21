import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  timeEntries: null,

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
