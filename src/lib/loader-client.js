'use strict';

/**
 * Load locale 'data'
 * @param {String} localeCode
 * @param {Object} locales
 * @param {Object} data
 * @param {Obejct} [options]
*/
module.exports = function load(localeCode, locales, data, options) {
  // Only one valid locale at a time
  if (Array.isArray(localeCode)) {
    localeCode = localeCode[0];
  }

  const localeInstance = locales.get(localeCode);

  if (!localeInstance) {
    locales.add(localeCode, data, options);
  }
};
