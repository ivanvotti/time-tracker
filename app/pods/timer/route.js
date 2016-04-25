import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('time-entry');
  },

  actions: {
    addTimeEntry(entryName) {
      return this.store.createRecord('time-entry', {
        name: entryName,
        startedAt: new Date()
      })
      .save();
    },

    continueTimeEntry(sourceEntry) {
      // TODO: copy tags as well
      return this.store.createRecord('time-entry', {
        name: sourceEntry.get('name'),
        startedAt: new Date()
      })
      .save();
    },

    stopTimeEntry(timeEntry) {
      let startedAt = timeEntry.get('startedAt');
      let endedAt = new Date();
      let duration = moment(endedAt).diff(startedAt, 'seconds');

      timeEntry.setProperties({
        endedAt,
        duration
      });

      return timeEntry.save();
    }
  }
});
