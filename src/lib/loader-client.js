'use strict';

/**
 * Load locale data
 * @param {String} localeCode
 * @param {Object} locales
 * @param {Object} [options]
 */
module.exports = function load (localeCode, locales, options) {
  // Only one valid locale at a time
  if (Array.isArray(localeCode)) localeCode = localeCode[0];

  const localeInstance = locales.get(localeCode);

  if (!localeInstance) locales.add(localeCode, null, options);
};