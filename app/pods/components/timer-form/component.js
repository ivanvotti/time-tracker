import Component from 'ember-component';
import EmberObject from 'ember-object';
import { empty, or } from 'ember-computed';
import { on } from 'ember-computed-decorators';
import { task } from 'ember-concurrency';
import { EKMixin, keyDown } from 'ember-keyboard';

export default Component.extend(EKMixin, {
  classNames: ['c-timer-form'],
  isTagPickerActive: false,

  isFormInvalid: empty('entryName'),
  isSubmitDisabled: or('submitFormTask.isRunning', 'isFormInvalid'),

  didReceiveAttrs() {
    this._super(...arguments);
    this.resetForm();
  },

  resetForm() {
    this.set('entryName', '');
    this.set('entryTags', []);
  },

  toggleKeyboard({ isActivated }) {
    if (this.get('keyboardActivated') === isActivated) {
      return;
    }

    this.setProperties({
      keyboardActivated: isActivated,
      keyboardFirstResponder: isActivated
    });
  },

  @on(keyDown('Tab'))
  onTab(event) {
    event.preventDefault();

    if (this.get('isTagPickerActive')) {
      this.send('focusNameInput');
    } else {
      // Trigger the name input focusOut event, so its disableKeyboard action
      // is called before the following enableKeyboard one.
      this.$('.js-entry-form-name-input').blur();
      this.set('isTagPickerActive', true);
      this.send('enableKeyboard');
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

    this.resetForm();
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
      this.toggleKeyboard({ isActivated: true });
    },

    disableKeyboard() {
      this.toggleKeyboard({ isActivated: false });
    },

    focusNameInput() {
      this.set('isTagPickerActive', false);
      this.$('.js-entry-form-name-input').focus();
    }
  }
});
