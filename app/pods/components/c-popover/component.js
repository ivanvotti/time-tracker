import Ember from 'ember';

export default Ember.Component.extend({
    tagName: '',
    target: null,
    attachment: 'top center',
    targetAttachment: 'bottom center',
    offset: '-20px 0',
    clickOutsideToClose: true,

    constraints: [
      { to: 'window', attachment: 'together' }
    ]
});
