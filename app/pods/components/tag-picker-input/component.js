import Ember from 'ember';

export default Ember.Component.extend({
  inputValue: null,
  selectedTags: null,

  classNames: ['c-tag-picker__input-section'],

  actions: {
    setInputValue(value) {
      this.attrs.setInputValue(value.trim());
    }
  }
});
