import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  submitFormTask: task(function* () {
    let entryName = this.get('entryName');

    if (!entryName) {
      return;
    }

    yield this.attrs.addNewEntry(entryName);

    this.set('entryName', '');
  }).drop(),

  actions: {
    submitForm() {
      this.get('submitFormTask').perform();
    }
  }
});
