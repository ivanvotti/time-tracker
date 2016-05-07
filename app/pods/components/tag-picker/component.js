import Ember from 'ember';
import { on } from 'ember-computed-decorators';

const { $, run } = Ember;

export default Ember.Component.extend({
  target: null,
  tags: null,
  selectedTags: null,
  inputValue: null,

  resetInputValue() {
    this.set('inputValue', null);
    this.focusInput();
  },

  click() {
    this.focusInput();
  },

  @on('didInsertElement')
  focusInput() {
    run(() => this.$('.js-tag-picker__input').focus());
  },

  @on('didInsertElement')
  initClickOutsideToClose() {
    run.next(() => {
      let elementId = this.get('elementId');
      $(document).on(`click.tag-picker-${elementId}`, (event) => {
        let $target = $(event.target);
        // We have to check the class name of the target as well,
        // because if `$target` is already removed from the DOM,
        // the `closest` method will always return an empty array.
        let isInsideClick = $target.closest('.c-tag-picker').length ||
                            $target.attr('class').includes('c-tag-picker');

        if (!isInsideClick) {
          this.attrs.close();
        }
      });
    });
  },

  @on('willDestroyElement')
  offClickOutsideToClose() {
    let elementId = this.get('elementId');
    $(document).off(`click.tag-picker-${elementId}`);
  },

  actions: {
    setInputValue(value) {
      this.set('inputValue', value);
    },

    createNewTag(...args) {
      this.attrs.createNewTag(...args);
      this.resetInputValue();
    },

    addTag(...args) {
      this.attrs.addTag(...args);
      this.resetInputValue();
    }
  }
});
