import Component from 'ember-component';
import EmberObject from 'ember-object';
import { empty, or } from 'ember-computed';
import { task } from 'ember-concurrency';

export default Component.extend({
  tagName: '',
  timeEntry: null,

  isFormInvalid: empty('entryName'),
  isDisabled: or('submitFormTask.isRunning', 'isFormInvalid'),

  didReceiveAttrs() {
    this._super(...arguments);
    this.initFormValues();
  },

  initFormValues() {
    let entryTags = [];

    this.set('entryName', this.get('timeEntry.name'));
    this.set('entryTags', entryTags);
    this.get('timeEntry.tags').then((tags) => entryTags.addObjects(tags));
  },

  submitFormTask: task(function* () {
    if (this.get('isFormInvalid')) {
      return;
    }

    yield this.attrs.submitForm({
      name: this.get('entryName'),
      tags: this.get('entryTags')
    });

    this.attrs.closeForm();
  }).drop(),

  actions: {
    addNewTagToEntry(newTagName) {
      let entryTags = this.get('entryTags');
      let upperNewTagName = newTagName.toUpperCase();
      let isNewTagNameUnique = !entryTags.any((tag) => (
        tag.get('name').toUpperCase() === upperNewTagName
      ));

      if (isNewTagNameUnique) {
        let tagMock = new EmberObject({ name: newTagName, isMock: true });
        entryTags.pushObject(tagMock);
      }
    },

    addTagToEntry(tag) {
      this.get('entryTags').pushObject(tag);
    },

    removeTagFromEntry(tag) {
      this.get('entryTags').removeObject(tag);
    }
  }
});
