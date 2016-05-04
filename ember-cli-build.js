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

    sassOptions: {
      nodeSass: require('node-sass')
    },

    svgjar: {
      prefix: 'icon-',
      ajaxing: true,
      optimize: {
        plugins: [
          { removeTitle: true },
          { removeDesc: true },
          { removeAttrs: { attrs: '(fill|fill-rule)' } }
        ]
      }
    }
  });

  app.import(app.bowerDirectory + '/normalize-css/normalize.css');

  return app.toTree();
};
