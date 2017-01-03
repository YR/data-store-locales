'use strict';

const assign = require('object-assign');
const dataStore = require('@yr/data-store');
// Remapped on client to "./lib/loader-client"
const loader = require('./lib/loader-server');

const DATA = {
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
const LANGUAGES = {
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

let _locales = {};
let _localeCodes = [];

module.exports = {
  /**
   * Initialize
   * @param {Array} localeCodes
   */
  init (localeCodes) {
    _localeCodes = localeCodes;
  },

  /**
   * Add new locale at 'localeCode' with 'data'
   * @param {String} localeCode
   * @param {Object} [data]
   * @param {Object} [options]
   * @returns {DataStore}
   */
  add (localeCode, data, options) {
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
  load (...args) {
    loader(_localeCodes, this, ...args);
  },

  /**
   * Lock all locales
   * @param {Function} fn
   */
  finalize (fn) {
    for (const localeCode in _locales) {
      const locale = _locales[localeCode];

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
  get (localeCode) {
    return _locales[localeCode];
  },

  /**
   * Retrieve all locales
   * @returns {Array}
   */
  all () {
    return _locales;
  },

  /**
   * Destroy all instances
   */
  destroy () {
    for (const localeCode in _locales) {
      _locales[localeCode].destroy();
    }
    _locales = {};
    _localeCodes = [];
  }
};