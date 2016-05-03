import Ember from 'ember';
import moment from 'moment';

const { RSVP } = Ember;

function saveTags(/* entry, tags */) {
  return RSVP.resolve();
}

export default Ember.Route.extend({
  model() {
    return RSVP.hash({
      timeEntries: this.store.findAll('time-entry'),
      tags: this.store.findAll('tag')
    });
  },

  actions: {
    addNewEntry(entryName) {
      return this.store.createRecord('time-entry', {
        name: entryName,
        startedAt: new Date()
      })
      .save();
    },

    restartEntry(sourceEntry) {
      // TODO: copy tags as well
      return this.store.createRecord('time-entry', {
        name: sourceEntry.get('name'),
        startedAt: new Date()
      })
      .save();
    },

    stopEntry(timeEntry) {
      let startedAt = timeEntry.get('startedAt');
      let endedAt = new Date();

      timeEntry.setProperties({
        endedAt,
        duration: moment(endedAt).diff(startedAt, 'seconds')
      });

      return timeEntry.save();
    },

    updateEntry(timeEntry, formData) {
      timeEntry.setProperties({ name: formData.name });
      return saveTags(timeEntry, formData.tags)
        .then(() => timeEntry.save());
    },

    deleteEntry(timeEntry) {
      return timeEntry.destroyRecord();
    }
  }
});
