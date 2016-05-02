import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  inputValue: null,

  actions: {
    setInputValue(value) {
      this.set('inputValue', value);
      this.attrs.setInputValue(value);
    }
  }
});
