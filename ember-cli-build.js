var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'svg']
    },

    babel: {
      includePolyfill: true,
      optional: ['es7.decorators']
    },

    svgstore: {
      files: {
        sourceDirs: 'icons',
        outputFile: '/assets/icons.svg'
      }
    }
  });

  app.import(app.bowerDirectory + '/normalize-css/normalize.css');

  return app.toTree();
};
