import Component from 'ember-component';
import EmberObject from 'ember-object';
import { empty, or } from 'ember-computed';
import { on } from 'ember-computed-decorators';
import { task } from 'ember-concurrency';
import { EKMixin, keyDown } from 'ember-keyboard';

export default Component.extend(EKMixin, {
  isTagPickerActive: false,

  isFormInvalid: empty('entryName'),
  isSubmitDisabled: or('submitFormTask.isRunning', 'isFormInvalid'),

  init() {
    this._super(...arguments);
    this.set('keyboardFirstResponder', true);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.initFormValues();
  },

  initFormValues() {
    // Should be implemented in the actual component.
  },

  onFormSubmitted() {
    // Should be implemented in the actual component.
  },

  @on(keyDown('Tab'))
  onTab(event) {
    event.preventDefault();

    if (this.get('isTagPickerActive')) {
      this.send('toggleTagPicker');
      this.send('focusNameInput');
    } else {
      // Trigger the name input focusOut event, so its disableKeyboard action
      // is called before the enableKeyboard one.
      this.$('.js-entry-form-name-input').blur();
      this.send('toggleTagPicker');
    }
  },

  submitFormTask: task(function* () {
    if (this.get('isFormInvalid')) {
      return;
    }

    yield this.attrs.submitForm({
      name: this.get('entryName'),
      tags: this.get('entryTags')
    });

    this.onFormSubmitted();
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

    enableKeyboard() {
      this.set('keyboardActivated', true);
    },

    disableKeyboard() {
      this.set('keyboardActivated', false);
    },

    focusNameInput() {
      this.$('.js-entry-form-name-input').focus();
    },

    toggleTagPicker() {
      let isTagPickerActive = !this.get('isTagPickerActive');
      this.set('isTagPickerActive', isTagPickerActive);
      this.send(isTagPickerActive ? 'enableKeyboard' : 'disableKeyboard');
    }
  }
});
