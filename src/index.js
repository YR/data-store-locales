'use strict';

const dataStore = require('@nrk/yr-data-store');
// Remapped on client to "./lib/loader-client"
const loader = require('./lib/loader-server');

let locales = {};
let localeCodes = [];
let frozen = false;

module.exports = {
  /**
   * Initialize
   * @param {Array} codes
   */
  init(codes) {
    localeCodes = codes;
  },

  /**
   * Add new locale at 'localeCode' with 'data'
   * @param {String} localeCode
   * @param {Object} [data]
   * @param {Object} [options]
   * @returns {DataStore}
   */
  add(localeCode, data, options) {
    if (!locales[localeCode]) {
      locales[localeCode] = dataStore.create(localeCode, data, options);
    }

    return locales[localeCode];
  },

  /**
   * Load locale data
   * @param {Array} args
   */
  load(...args) {
    if (frozen) {
      return;
    }

    loader(localeCodes, this, ...args);
  },

  /**
   * Lock all locales after optionally setting data
   * @param {Object} [data]
   */
  freeze(data) {
    frozen = true;

    for (const localeCode in locales) {
      const locale = locales[localeCode];

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
    return locales[localeCode];
  },

  /**
   * Retrieve all locales
   * @returns {Object}
   */
  all() {
    return locales;
  },

  /**
   * Destroy all instances
   */
  destroy() {
    for (const localeCode in locales) {
      locales[localeCode].destroy();
    }
    locales = {};
    localeCodes = [];
    frozen = false;
  }
};
