'use strict';

/**
 * Load locale 'data'
 * @param {String} localeCode
 * @param {Object} locales
 * @param {Object} data
*/
module.exports = function load(localeCode, locales, data) {
  // Only one valid locale at a time
  if (Array.isArray(localeCode)) {
    localeCode = localeCode[0];
  }

  const localeInstance = locales.get(localeCode);

  if (!localeInstance) {
    locales.add(localeCode, data);
  }
};
