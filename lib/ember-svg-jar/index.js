'use strict';

var fs           = require('fs');
var path         = require('path');
var Funnel       = require('broccoli-funnel');
var concat       = require('broccoli-concat');
var MergeTrees   = require('broccoli-merge-trees');
var SVGOptimizer = require('broccoli-svg-optimizer');
var defaults     = require('lodash.defaults');
var SymbolFilter = require('./symbol-filter');

var ajaxingCode = fs.readFileSync(path.join(__dirname, 'ajaxing-code.html'), 'utf8');

module.exports = {
  name: 'ember-svg-jar',

  initializeOptions: function(options) {
    this.options = defaults(options || {}, {
      sourceDirs: ['icons'],
      outputFile: '/assets/icons.svg',
      prefix: '',
      ajaxing: false,
      optimize: {},
      persist: true
    });
  },

  included: function(app) {
    this.initializeOptions(app.options.svgjar);
  },

  getSourceNodes: function() {
    var nodes = this.options.sourceDirs.filter(function(sourceDir) {
      return fs.existsSync(sourceDir);
    });

    return nodes.length === 1 ? nodes[0] : MergeTrees(nodes);
  },

  treeForPublic: function() {
    var svgFiles = new Funnel(this.getSourceNodes(), {
      include: ['**/*.svg']
    });

    if (this.options.optimize) {
      svgFiles = new SVGOptimizer(svgFiles, {
        svgoConfig: this.options.optimize,
        persist: this.options.persist
      });
    }

    var symbolFiles = new SymbolFilter(svgFiles, {
      prefix: this.options.prefix,
      persist: this.options.persist
    });

    var outputSvgFile = concat(symbolFiles, {
      outputFile: this.options.outputFile,
      header: '<svg xmlns="http://www.w3.org/2000/svg" style="display: none">',
      footer: '</svg>',
      allowNone: true
    });

    return outputSvgFile;
  },

  contentFor: function(type) {
    if (this.options.ajaxing && type === 'body') {
      return ajaxingCode.replace('{{SVG_FILE}}', this.options.outputFile);
    }

    return '';
  }
};
