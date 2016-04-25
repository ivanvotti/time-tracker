import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  timeEntries: null,

  @computed('timeEntries.@each.isEnded')
  activeTimeEntry(timeEntries) {
    return timeEntries && timeEntries.findBy('isEnded', false);
  },

  actions: {
    async startNewTimer(newEntryName) {
      let activeTimeEntry = this.get('activeTimeEntry');

      if (activeTimeEntry) {
        await this.attrs.stopEntry(activeTimeEntry);
      }

      return this.attrs.addNewEntry(newEntryName);
    },

    async restartEntry(timeEntry) {
      let activeTimeEntry = this.get('activeTimeEntry');

      if (activeTimeEntry) {
        await this.attrs.stopEntry(activeTimeEntry);
      }

      return this.attrs.restartEntry(timeEntry);
    }
  }
});
