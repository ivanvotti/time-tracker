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

    stopTimeEntry(timeEntry) {
      let startedAt = timeEntry.get('startedAt');
      let stoppedAt = new Date();
      let duration = moment(stoppedAt).diff(startedAt, 'seconds');

      timeEntry.setProperties({
        stoppedAt,
        duration
      });
      return timeEntry.save();
    }
  }
});
