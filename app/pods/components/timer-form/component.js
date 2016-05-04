import Ember from 'ember';
import { task } from 'ember-concurrency';

const { empty, or } = Ember.computed;

export default Ember.Component.extend({
  tagName: '',

  isFormInvalid: empty('entryName'),
  isSubmitDisabled: or('submitFormTask.isRunning', 'isFormInvalid'),

  resetForm() {
    this.set('entryName', '');
    this.set('entryTags', []);
  },

  submitFormTask: task(function* () {
    if (this.get('isFormInvalid')) {
      return;
    }

    yield this.attrs.submitForm({
      name: this.get('entryName'),
      tags: this.get('entryTags')
    });

    this.resetForm();
  }).drop(),

  didReceiveAttrs() {
    this._super(...arguments);
    this.resetForm();
  },

  actions: {
    addNewTagToEntry(newTagName) {
      let entryTags = this.get('entryTags');
      let upperNewTagName = newTagName.toUpperCase();
      let isNewTagNameUnique = !entryTags.any((tag) => (
        tag.get('name').toUpperCase() === upperNewTagName
      ));

      if (isNewTagNameUnique) {
        let mockTag = new Ember.Object({ name: newTagName, isMock: true });
        entryTags.pushObject(mockTag);
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
