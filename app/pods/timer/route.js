import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('time-entry');
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
      let duration = moment(endedAt).diff(startedAt, 'seconds');

      timeEntry.setProperties({
        endedAt,
        duration
      });

      return timeEntry.save();
    },

    updateEntry(timeEntry, data) {
      return timeEntry.setProperties(data).save();
    }
  }
});
