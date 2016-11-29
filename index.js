'use strict';

var assign = require('object-assign');
var dataStore = require('@yr/data-store');

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

var locales = {};

module.exports = {
  /**
   * Create new locale at 'localeCode' with 'data'
   * @param {String} localeCode
   * @param {Object} [data]
   * @param {Object} [options]
   * @returns {DataStore}
   */
  create: function create(localeCode, data, options) {
    if (!locales[localeCode]) {
      data = assign({}, DATA[localeCode], LANGUAGES, data);
      locales[localeCode] = dataStore.create(localeCode, data, options);
    }

    return locales[localeCode];
  },

  /**
   * Initialize all locales
   * @param {Function} fn
   */
  init: function init(fn) {
    for (var localeCode in locales) {
      var locale = locales[localeCode];

      if (fn) fn(locale);

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
    return locales[localeCode];
  },

  /**
   * Destroy all instances
   */
  destroy: function destroy() {
    for (var localeCode in locales) {
      locales[localeCode].destroy();
    }
    locales = {};
  }
};