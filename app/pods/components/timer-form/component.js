import Ember from 'ember';
import { task } from 'ember-concurrency';

const { computed } = Ember;

export default Ember.Component.extend({
  isValid: computed.notEmpty('timeEntryName'),
  isInvalid: computed.not('isValid'),
  isDisabled: computed.or('submitFormTask.isRunning', 'isInvalid'),

  resetForm() {
    this.set('timeEntryName', '');
  },

  submitFormTask: task(function* () {
    if (this.get('isInvalid')) {
      return;
    }

    yield this.attrs.submit(this.get('timeEntryName'));
    this.resetForm();
  }).drop()
});
