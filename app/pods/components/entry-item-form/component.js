import Ember from 'ember';
import { task } from 'ember-concurrency';

const { empty, or } = Ember.computed;

export default Ember.Component.extend({
  timeEntry: null,

  tagName: '',

  isInvalid: empty('entryName'),
  isDisabled: or('submitFormTask.isRunning', 'isInvalid'),

  submitFormTask: task(function* () {
    if (this.get('isInvalid')) {
      return;
    }

    yield this.attrs.submitForm({
      name: this.get('entryName'),
      tags: this.get('entryTags')
    });

    this.attrs.closeForm();
  }).drop(),

  initFormValues() {
    let entryTags = [];

    this.set('entryName', this.get('timeEntry.name'));
    this.set('entryTags', entryTags);
    this.get('timeEntry.tags').then((tags) => entryTags.addObjects(tags));
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.initFormValues();
  },

  actions: {
    addNewTagToEntry(newTagName) {
      let entryTags = this.get('entryTags');
      let upperNewTagName = newTagName.toUpperCase();
      let isNewTagNameUnique = !entryTags.any((tag) => (
        tag.get('name').toUpperCase() === upperNewTagName
      ));

      if (isNewTagNameUnique) {
        entryTags.pushObject(new Ember.Object({ name: newTagName }));
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
