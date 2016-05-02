import Ember from 'ember';
import { task } from 'ember-concurrency';

const { empty, or } = Ember.computed;

export default Ember.Component.extend({
  name: null,

  entryTags: [],
  allTags: [
    { name: 'Money' },
    { name: 'Health' },
    { name: 'Sport' },
    { name: 'Working' }
  ],

  isInvalid: empty('name'),
  isDisabled: or('submitFormTask.isRunning', 'isInvalid'),

  didReceiveAttrs() {
    this._super(...arguments);
    this.initFormValues();
  },

  initFormValues() {
    this.set('name', this.get('timeEntry.name'));
  },

  submitFormTask: task(function* () {
    if (this.get('isInvalid')) {
      return;
    }

    let formData = this.getProperties('name');
    yield this.attrs.submitForm(formData);

    this.attrs.closeForm();
  }).drop(),

  actions: {
    createNewTag(name) {
      let tag = { name };
      this.allTags.pushObject(tag);
      this.entryTags.pushObject(tag);
    },

    addTag(tag) {
      this.entryTags.pushObject(tag);
    },

    removeTag(tag) {
      this.entryTags.removeObject(tag);
    }
  }
});
