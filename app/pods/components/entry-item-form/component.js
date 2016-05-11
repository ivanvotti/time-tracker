import BaseEntryFormComponent from '../base-entry-form';

export default BaseEntryFormComponent.extend({
  classNames: ['c-entry'],
  timeEntry: null,

  initFormValues() {
    let entryTags = [];
    this.set('entryName', this.get('timeEntry.name'));
    this.set('entryTags', entryTags);
    this.get('timeEntry.tags')
      .then((tags) => entryTags.addObjects(tags));
  },

  onFormSubmitted() {
    this.attrs.closeForm();
  }
});
