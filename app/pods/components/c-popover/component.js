import Ember from 'ember';

const { $, run } = Ember;

export default Ember.Component.extend({
  tagName: '',
  target: null,
  attachment: 'top center',
  targetAttachment: 'bottom center',
  offset: '-20px 0',
  clickOutsideToClose: false,

  constraints: [
    { to: 'window', attachment: 'together' }
  ],

  initClickOutsideToClose() {
    run.next(() => {
      $(document).on('click.c-popover', (event) => {
        let isInsideClick = $(event.target).closest('.c-popover').length;

        if (!isInsideClick) {
          this.attrs.close();
        }
      });
    });
  },

  offClickOutsideToClose() {
    $(document).off('click.c-popover');
  },

  didInsertElement() {
    this._super(...arguments);

    if (this.get('clickOutsideToClose')) {
      this.initClickOutsideToClose();
    }
  },

  willDestroyElement() {
    this._super(...arguments);

    if (this.get('clickOutsideToClose')) {
      this.offClickOutsideToClose();
    }
  }
});
