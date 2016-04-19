var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'svg']
    },

    babel: {
      includePolyfill: true
    },

    svgstore: {
      files: {
        sourceDirs: 'icons',
        outputFile: '/assets/icons.svg'
      }
    }
  });

  app.import('bower_components/normalize-css/normalize.css');

  return app.toTree();
};
