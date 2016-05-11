import BaseEntryFormComponent from '../base-entry-form';

export default BaseEntryFormComponent.extend({
  classNames: ['c-timer-form'],

  initFormValues() {
    this.set('entryName', '');
    this.set('entryTags', []);
  },

  onFormSubmitted() {
    this.initFormValues();
  }
});
