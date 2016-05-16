import Component from 'ember-component';
import set from 'ember-metal/set';
import run from 'ember-runloop';

export default Component.extend({
  isEditing: false,

  doubleClick() {
    this.startEditing();
  },

  startEditing() {
    set(this, 'isEditing', true);
    run.scheduleOnce('afterRender', () => this.$('input').focus());
  },

  actions: {
    stopEditing() {
      set(this, 'isEditing', false);
    }
  }
});
