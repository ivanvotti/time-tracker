import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  timeEntries: null,

  @computed('timeEntries.@each.isStopped')
  currentTimeEntry(timeEntries) {
    return timeEntries && timeEntries.findBy('isStopped', false);
  },

  actions: {
    async startNewTimer(newEntryName) {
      let currentTimeEntry = this.get('currentTimeEntry');

      if (currentTimeEntry) {
        await this.attrs.stopTimeEntry(currentTimeEntry);
      }

      return this.attrs.addTimeEntry(newEntryName);
    }
  }
});
