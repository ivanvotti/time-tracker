var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    svgstore: {
      files: {
        sourceDirs: 'icons',
        outputFile: '/assets/icons.svg'
      }
    },

    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'svg']
    }
  });

  app.import('bower_components/normalize-css/normalize.css');

  return app.toTree();
};
