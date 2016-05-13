'use strict';

/**
  The config loader works like this:
  - loads core settings from base.js
  - loads environment-specific config overrides (dev, prod or test)
  - if there're local overrides at local.js, it pulls those in

  The config directory contents:
  - base.js  -- Base settings that apply to all environments.
  - dev.js   -- Development specific settings.
  - prod.js  -- Production specific settings.
  - test.js  -- Testing specific settings.
  - local.js -- Optional local overrides (it must be in your .gitignore).
*/

const merge = require('lodash.merge');

module.exports = function(environment) {
  let isDevelopment = environment === 'development';
  let isProduction = environment === 'production';
  let isTest = environment === 'test';
  let config = { environment };

  merge(config, require('./base'));

  if (isDevelopment) {
    merge(config, require('./dev'));
  } else if (isProduction) {
    merge(config, require('./prod'));
  } else if (isTest) {
    merge(config, require('./test'));
  }

  /**
    Optional system-specific settings from local.js
    It's a good place for passwords, api keys and other local overrides.
    This file should never be added to your version control.
  */
  if (!isTest) {
    try {
      merge(config, require('./local'));
    } catch (e) {/* ignore if there's no local.js file */}
  }

  return config;
};
