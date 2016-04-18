/**
  Development specific settings.
*/

module.exports = {
  APP: {
    // LOG_RESOLVER: true,
    // LOG_MODULE_RESOLVER: true,
    // LOG_TRANSITIONS: true,
    // LOG_TRANSITIONS_INTERNAL: true,
    // LOG_ACTIVE_GENERATION: true,
    // LOG_VIEW_LOOKUPS: true
  },

  exportApplicationGlobal: true,

  emberPouch: {
    remoteDb: 'http://localhost:5984/time-tracker'
  }
};
