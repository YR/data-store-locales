'use strict';

/**
 * Utility to load language locales.
 * Loads and parses all locales on initialization.
 */

var locales = require('./index');

/**
 * Load locale data
 * @param {String} localeCode
 * @param {Object} options
 */
module.exports = function load(localeCode, options) {
  var localeInstance = locales.get(localeCode);

  if (!localeInstance) locales.create(localeCode, options);
};