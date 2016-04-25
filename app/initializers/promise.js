import Ember from 'ember';

const { RSVP } = Ember;

/**
  Replace the native Promise object with the RSVP one
  that is aware of the Ember run-loop.

  It's here to support the async functions feature from Babel.
*/
export function initialize() {
  window.Promise = RSVP.Promise;
}

export default {
  name: 'promise',
  initialize
};
