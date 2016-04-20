import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    startNewTimer(timeEntryName) {
      return this.attrs.addTimeEntry(timeEntryName);
    }
  }
});
