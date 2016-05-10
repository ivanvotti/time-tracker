import Component from 'ember-component';

export default Component.extend({
  classNames: ['c-tag-picker__input-section'],
  inputValue: null,
  selectedTags: null,

  actions: {
    setInputValue(value) {
      this.attrs.setInputValue(value.trim());
    }
  }
});
