/**
  Base settings that apply to all environments.
*/

module.exports = {
  modulePrefix: 'time-tracker',
  podModulePrefix: 'time-tracker/pods',
  locationType: 'auto',

  // https://github.com/rwjblue/ember-cli-content-security-policy
  contentSecurityPolicy: {
    'default-src': ["'none'"],
    'script-src': ["'self'", "'unsafe-inline'"],
    'font-src': ["'self'", 'data:'],
    'connect-src': ["'self'"],
    'img-src': ["'self'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'media-src': null
  },

  pageTitle: {
    prepend: true,
    separator: ' · '
  },

  emberPouch: {
    localDb: 'time-tracker'
  },

  serviceWorker: {
    enabled: true,

    networkFirstURLs: [
      '/',
      '/timer'
    ],

    swIncludeFiles: [
      'bower_components/pouchdb/dist/pouchdb.js'
    ]
  }
};
