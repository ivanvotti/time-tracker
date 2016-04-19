import Ember from 'ember';

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
    }
  }
});