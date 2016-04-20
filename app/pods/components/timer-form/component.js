import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  submitFormTask: task(function* () {
    let timeEntryName = this.get('timeEntryName');

    if (!timeEntryName) {
      return;
    }

    yield this.attrs.submit(timeEntryName);

    this.set('timeEntryName', '');
  }).drop()
});
