import Component from 'ember-component';
import computed from 'ember-computed-decorators';

export default Component.extend({
  timeEntries: null,

  @computed('timeEntries.@each.isActive')
  activeTimeEntry(timeEntries) {
    return timeEntries && timeEntries.findBy('isActive', true);
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
