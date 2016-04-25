import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['c-time-entry'],
  classNameBindings: ['timeEntry.isActive:c-time-entry--active'],
  isEditing: false,

  doubleClick() {
    this.set('isEditing', true);
  },

  actions: {
    stopEditing() {
      this.set('isEditing', false);
    }
  }
});
