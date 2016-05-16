import set from 'ember-metal/set';
import BaseEntryFormComponent from '../base-entry-form';

export default BaseEntryFormComponent.extend({
  classNames: ['c-timer-form'],

  initFormValues() {
    set(this, 'entryName', '');
    set(this, 'entryTags', []);
  },

  onFormSubmitted() {
    this.initFormValues();
  }
});
