import Component from 'ember-component';
import run from 'ember-runloop';
import $ from 'jquery';

export default Component.extend({
  tagName: '',
  target: null,
  attachment: 'top center',
  targetAttachment: 'bottom center',
  offset: '-20px 0',
  clickOutsideToClose: false,
  constraints: [{ to: 'window', attachment: 'together' }],

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
  },

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
  }
});
