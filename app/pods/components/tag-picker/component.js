import Component from 'ember-component';
import set from 'ember-metal/set';
import run from 'ember-runloop';
import $ from 'jquery';

export default Component.extend({
  popoverTarget: null,
  allTags: null,
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
    set(this, 'inputValue', null);
    this.focusInput();
  },

  focusInput() {
    run(() => this.$('.js-tag-picker-input').focus());
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
      set(this, 'inputValue', value);
    },

    createAndSelectTag() {
      let newTag = this.attrs.createTag(this.get('inputValue'));
      this.attrs.selectTag(newTag);
      this.resetInputValue();
    },

    selectTag() {
      this.attrs.selectTag(...arguments);
      this.resetInputValue();
    },

    onEmptyEnter() {
      if (this.attrs.onEmptyEnter) {
        this.attrs.onEmptyEnter();
      }
    }
  }
});
