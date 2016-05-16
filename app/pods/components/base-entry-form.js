import Component from 'ember-component';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
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
    set(this, 'keyboardFirstResponder', true);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.initFormValues();
  },

  initFormValues() {
    /* Should be implemented in the actual component. */
  },

  onFormSubmitted() {
    /* Should be implemented in the actual component. */
  },

  focusNameInput() {
    this.$('.js-entry-form-name-input').focus();
  },

  enableKeyboard() {
    set(this, 'keyboardActivated', true);
  },

  disableKeyboard() {
    set(this, 'keyboardActivated', false);
  },

  toggleTagPicker() {
    let isTagPickerActive = !get(this, 'isTagPickerActive');
    set(this, 'isTagPickerActive', isTagPickerActive);

    if (isTagPickerActive) {
      this.enableKeyboard();
    } else {
      this.disableKeyboard();
    }
  },

  @on(keyDown('Tab'))
  onTab(event) {
    event.preventDefault();

    if (get(this, 'isTagPickerActive')) {
      this.toggleTagPicker();
      this.focusNameInput();
    } else {
      // Trigger the name input focusOut event, so its disableKeyboard action
      // is called before the enableKeyboard one.
      this.$('.js-entry-form-name-input').blur();
      this.toggleTagPicker();
    }
  },

  submitFormTask: task(function* () {
    if (get(this, 'isFormInvalid')) {
      this.focusNameInput();
      return;
    }

    yield this.attrs.submitForm({
      name: get(this, 'entryName'),
      tags: get(this, 'entryTags')
    });

    this.onFormSubmitted();
  }).drop(),

  actions: {
    /**
      createTag action only creates a tag mock. The actual tag will only be
      created in the form consumer, if the form will be submitted.

      It expects that the newTagName is unique. The uniqueness should be
      checked in the child component.
    */
    createTag(newTagName) {
      return { name: newTagName, isMock: true };
    },

    addTagToEntry(tag) {
      get(this, 'entryTags').pushObject(tag);
    },

    removeTagFromEntry(tag) {
      get(this, 'entryTags').removeObject(tag);
    },

    enableKeyboard() {
      this.enableKeyboard();
    },

    disableKeyboard() {
      this.disableKeyboard();
    },

    focusNameInput() {
      this.focusNameInput();
    },

    toggleTagPicker() {
      this.toggleTagPicker();
    }
  }
});
