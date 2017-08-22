'use strict';

const dataStore = require('@yr/data-store');
// Remapped on client to "./lib/loader-client"
const loader = require('./lib/loader-server');

let _locales = {};
let _localeCodes = [];

module.exports = {
  /**
   * Initialize
   * @param {Array} localeCodes
   */
  init(localeCodes) {
    _localeCodes = localeCodes;
  },

  /**
   * Add new locale at 'localeCode' with 'data'
   * @param {String} localeCode
   * @param {Object} [data]
   * @param {Object} [options]
   * @returns {DataStore}
   */
  add(localeCode, data, options) {
    if (!_locales[localeCode]) {
      _locales[localeCode] = dataStore.create(localeCode, data, options);
    }

    return _locales[localeCode];
  },

  /**
   * Load locale data
   * @param {Array} args
   */
  load(...args) {
    loader(_localeCodes, this, ...args);
  },

  /**
   * Lock all locales after optionally setting data
   * @param {Object} [data]
   */
  freeze(data) {
    for (const localeCode in _locales) {
      const locale = _locales[localeCode];

      if (data !== undefined && data[localeCode] !== undefined) {
        locale.setAll(data[localeCode]);
      }

      // Lock
      locale.setWriteable(false);
    }
  },

  /**
   * Retrieve dataStore at 'localeCode'
   * @param {String} localeCode
   * @returns {DataStore}
   */
  get(localeCode) {
    return _locales[localeCode];
  },

  /**
   * Retrieve all locales
   * @returns {Array}
   */
  all() {
    return _locales;
  },

  /**
   * Destroy all instances
   */
  destroy() {
    for (const localeCode in _locales) {
      _locales[localeCode].destroy();
    }
    _locales = {};
    _localeCodes = [];
  }
};
