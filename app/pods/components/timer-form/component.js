import Ember from 'ember';
import { on } from 'ember-computed-decorators';
import { task } from 'ember-concurrency';
import { EKMixin, keyDown } from 'ember-keyboard';

const { run } = Ember;
const { empty, or, equal } = Ember.computed;

export default Ember.Component.extend(EKMixin, {
  tagName: '',
  currentField: null,

  isTagPickerActive: equal('currentField', 'tagPicker'),
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
      run(() => Ember.$('.js-timer-form-name-input').focus());
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
        let mockTag = new Ember.Object({ name: newTagName, isMock: true });
        entryTags.pushObject(mockTag);
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
