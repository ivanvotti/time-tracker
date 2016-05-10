import Ember from 'ember';

const { run } = Ember;

export default Ember.Component.extend({
  classNames: ['c-time-entry'],
  classNameBindings: ['timeEntry.isActive:c-time-entry--active'],
  isEditing: false,

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
