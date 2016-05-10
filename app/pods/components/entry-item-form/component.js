import Component from 'ember-component';
import EmberObject from 'ember-object';
import { empty, or, equal } from 'ember-computed';
import { on } from 'ember-computed-decorators';
import { task } from 'ember-concurrency';
import { EKMixin, keyDown } from 'ember-keyboard';
import $ from 'jquery';

export default Component.extend(EKMixin, {
  tagName: '',
  timeEntry: null,
  currentField: null,

  isTagPickerActive: equal('currentField', 'tagPicker'),
  isFormInvalid: empty('entryName'),
  isSubmitDisabled: or('submitFormTask.isRunning', 'isFormInvalid'),

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

  toggleKeyboard({ isEnabled }) {
    this.setProperties({
      keyboardActivated: isEnabled,
      keyboardFirstResponder: isEnabled
    });
  },

  @on(keyDown('Tab'))
  onTab(event) {
    event.preventDefault();
    let currentField = this.get('currentField');
    let nextField = currentField === 'nameInput' ? 'tagPicker' : 'nameInput';

    if (nextField === 'nameInput') {
      let elementId = this.get('elementId');
      $(`.js-entry-form-name-input-${elementId}`).focus();
    }

    this.set('currentField', nextField);
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
    },

    focusField(fieldName) {
      this.set('currentField', fieldName);
      this.toggleKeyboard({ isEnabled: true });
    },

    blurField(fieldName) {
      if (fieldName === this.get('currentField')) {
        this.set('currentField', null);
        this.toggleKeyboard({ isEnabled: false });
      }
    }
  }
});
