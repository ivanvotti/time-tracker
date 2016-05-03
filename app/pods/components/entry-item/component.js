import Ember from 'ember';

const { run } = Ember;

export default Ember.Component.extend({
  isEditing: false,

  classNames: ['c-time-entry'],
  classNameBindings: ['timeEntry.isActive:c-time-entry--active'],

  doubleClick() {
    this.set('isEditing', true);
    run.scheduleOnce('afterRender', () => this.$('input').focus());
  },

  actions: {
    stopEditing() {
      this.set('isEditing', false);
    }
  }
});
