import get from 'ember-metal/get';
import set from 'ember-metal/set';
import BaseEntryFormComponent from '../base-entry-form';

export default BaseEntryFormComponent.extend({
  classNames: ['c-entry'],
  timeEntry: null,

  initFormValues() {
    let entryTags = [];
    set(this, 'entryName', get(this, 'timeEntry.name'));
    set(this, 'entryTags', entryTags);

    get(this, 'timeEntry.tags')
      .then((tags) => entryTags.addObjects(tags));
  },

  onFormSubmitted() {
    this.attrs.closeForm();
  }
});
