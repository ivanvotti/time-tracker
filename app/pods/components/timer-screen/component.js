import Component from 'ember-component';
import get from 'ember-metal/get';
import computed from 'ember-computed-decorators';

export default Component.extend({
  timeEntries: null,

  @computed('timeEntries.@each.isActive')
  activeTimeEntry(timeEntries) {
    return timeEntries && timeEntries.findBy('isActive', true);
  },

  actions: {
    async startNewTimer(newEntryName) {
      let activeTimeEntry = get(this, 'activeTimeEntry');

      if (activeTimeEntry) {
        await this.attrs.stopEntry(activeTimeEntry);
      }

      return this.attrs.createEntry(newEntryName);
    },

    async restartEntry(timeEntry) {
      let activeTimeEntry = get(this, 'activeTimeEntry');

      if (activeTimeEntry) {
        await this.attrs.stopEntry(activeTimeEntry);
      }

      return this.attrs.restartEntry(timeEntry);
    }
  }
});
