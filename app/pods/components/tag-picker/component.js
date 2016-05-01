import Ember from 'ember';

const { $, run } = Ember;
const { setDiff } = Ember.computed;

export default Ember.Component.extend({
  target: null,
  tags: null,
  selectedTags: null,

  availableTags: setDiff('tags', 'selectedTags'),

  initAutoFocus() {
    this.$('.js-tag-picker__input').focus();
  },

  click() {
    this.$('.js-tag-picker__input').focus();
  },

  initClickOutsideToClose() {
    run.next(() => {
      $(document).on('click.c-tag-picker', (event) => {
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
    $(document).off('click.c-tag-picker');
  },

  didInsertElement() {
    this._super(...arguments);
    this.initAutoFocus();
    this.initClickOutsideToClose();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.offClickOutsideToClose();
  }
});
