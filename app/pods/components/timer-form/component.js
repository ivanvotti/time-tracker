import Ember from 'ember';
import { task } from 'ember-concurrency';

const { empty, or } = Ember.computed;

export default Ember.Component.extend({
  isInvalid: empty('timeEntryName'),
  isDisabled: or('submitFormTask.isRunning', 'isInvalid'),

  resetForm() {
    this.set('timeEntryName', '');
  },

  submitFormTask: task(function* () {
    if (this.get('isInvalid')) {
      return;
    }

    yield this.attrs.submitForm(this.get('timeEntryName'));
    this.resetForm();
  }).drop()
});
