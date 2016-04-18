module.exports = {
  'extends': [
    'airbnb/base'
  ],

  'parser': 'babel-eslint',

  'plugins': [
    'babel'
  ],

  'env': {
    'browser': true,
    'es6': true,
    'node': false
  },

  'parserOptions': {
    'ecmaFeatures': {
      'jsx': false,
      'generators': true,
      'impliedStrict': true
    }
  },

  'rules': {
    'babel/generator-star-spacing': [2, {
      'before': false,
      'after': true
    }],
    'prefer-const': 0,
    'comma-dangle': 0,
    'prefer-arrow-callback': 0,
    'func-names': 0,
    'space-before-function-paren': [0, {
      'anonymous': 'always',
      'named': 'never'
    }],
    'prefer-rest-params': 0,
    'array-callback-return': 0
  }
};
