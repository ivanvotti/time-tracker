import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  timeEntries: null,

  @computed('timeEntries.@each.isEnded')
  currentTimeEntry(timeEntries) {
    return timeEntries && timeEntries.findBy('isEnded', false);
  },

  actions: {
    async startNewTimer(newEntryName) {
      let currentTimeEntry = this.get('currentTimeEntry');

      if (currentTimeEntry) {
        await this.attrs.stopEntry(currentTimeEntry);
      }

      return this.attrs.addNewEntry(newEntryName);
    },

    async continueTimeEntry(timeEntry) {
      let currentTimeEntry = this.get('currentTimeEntry');

      if (currentTimeEntry) {
        await this.attrs.stopEntry(currentTimeEntry);
      }

      return this.attrs.continueTimeEntry(timeEntry);
    }
  }
});
