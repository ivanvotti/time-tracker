import Component from 'ember-component';
import run from 'ember-runloop';
import $ from 'jquery';

export default Component.extend({
  target: null,
  tags: null,
  selectedTags: null,
  inputValue: null,

  didInsertElement() {
    this._super(...arguments);
    this.focusInput();
    this.initClickOutsideToClose();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.offClickOutsideToClose();
  },

  click() {
    this.focusInput();
  },

  resetInputValue() {
    this.set('inputValue', null);
    this.focusInput();
  },

  focusInput() {
    run(() => this.$('.js-tag-picker__input').focus());
  },

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

  offClickOutsideToClose() {
    let elementId = this.get('elementId');
    $(document).off(`click.tag-picker-${elementId}`);
  },

  actions: {
    setInputValue(value) {
      this.set('inputValue', value);
    },

    createNewTag() {
      this.attrs.createNewTag(...arguments);
      this.resetInputValue();
    },

    addTag() {
      this.attrs.addTag(...arguments);
      this.resetInputValue();
    },

    emptyEnter() {
      if (this.attrs.emptyEnter) {
        this.attrs.emptyEnter();
      }
    }
  }
});
