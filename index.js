'use strict';

var assign = require('object-assign');
var dataStore = require('@yr/data-store');
// Remapped on client to "./lib/loader-client"
var loader = require('./lib/loader-server');

var DATA = {
  en: {
    code: 'en',
    lang: 'en-gb',
    title: 'english'
  },
  nb: {
    code: 'nb',
    lang: 'nb-no',
    title: 'bokmål'
  },
  nn: {
    code: 'nn',
    lang: 'nn-no',
    title: 'nynorsk'
  }
};
var LANGUAGES = {
  languages: {
    norwegian: {
      nb: 'bokmål',
      nn: 'nynorsk'
    },
    other: {
      en: 'english'
    }
  }
};

var _locales = {};
var _localeCodes = [];

module.exports = {
  /**
   * Initialize
   * @param {Array} localeCodes
   */
  init: function init(localeCodes) {
    _localeCodes = localeCodes;
  },


  /**
   * Add new locale at 'localeCode' with 'data'
   * @param {String} localeCode
   * @param {Object} [data]
   * @param {Object} [options]
   * @returns {DataStore}
   */
  add: function add(localeCode, data, options) {
    if (!_locales[localeCode]) {
      data = assign({}, DATA[localeCode], LANGUAGES, data);
      _locales[localeCode] = dataStore.create(localeCode, data, options);
    }

    return _locales[localeCode];
  },


  /**
   * Load locale data
   * @param {Array} args
   */
  load: function load() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    loader.apply(undefined, [_localeCodes, this].concat(args));
  },


  /**
   * Lock all locales
   * @param {Function} fn
   */
  finalize: function finalize(fn) {
    for (var localeCode in _locales) {
      var locale = _locales[localeCode];

      if (fn) fn(locale, this);

      // Lock
      locale.isWritable = false;
    }
  },


  /**
   * Retrieve dataStore at 'localeCode'
   * @param {String} localeCode
   * @returns {DataStore}
   */
  get: function get(localeCode) {
    return _locales[localeCode];
  },


  /**
   * Destroy all instances
   */
  destroy: function destroy() {
    for (var localeCode in _locales) {
      _locales[localeCode].destroy();
    }
    _locales = {};
    _localeCodes = [];
  }
};