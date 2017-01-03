'use strict';

var path = require('path');
var readdir = require('@yr/readdir');

/**
 * Load locale files in 'localespath'
 * @param {Array} localeCodes
 * @param {Object} locales
 * @param {String} localespath
 * @param {Object} [options]
 */
module.exports = function load(localeCodes, locales, localespath, options) {
  localeCodes.forEach(function (localeCode) {
    var localeInstance = locales.get(localeCode);

    if (!localeInstance) {
      var time = void 0;

      try {
        time = require('@yr/time/locale/' + localeCode + '.json');
      } catch (err) {
        time = {};
      }

      localeInstance = locales.add(localeCode, { time: time }, options);
    }

    var data = loadLocale(path.resolve(localespath, localeCode));

    if (data) localeInstance.set(data);
  });
};

/**
 * Load locale files at 'localepath'
 * @param {String} localepath
 * @returns {Object}
 */
function loadLocale(localepath) {
  var data = {};

  // Read and store file contents
  readdir(localepath, true, /\.json$/).forEach(function (filepath) {
    // Use filename as key
    var key = path.basename(filepath).replace(path.extname(filepath), '');
    // Parse property names (directory names under localepath)
    var props = filepath.replace(localepath, '').split(path.sep).slice(1, -1);
    var slot = data;

    if (props.length) {
      // Walk and set props
      props.reduce(function (prev, cur) {
        if (!prev[cur]) prev[cur] = {};
        // Store reference
        slot = prev[cur];
        return slot;
      }, data);
    }

    slot[key] = require(filepath);
  });

  return data;
}