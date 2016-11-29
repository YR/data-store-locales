'use strict';

const assign = require('object-assign');
const dataStore = require('@yr/data-store');

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

let locales = {};

module.exports = {
  /**
   * Create new locale at 'localeCode' with 'data'
   * @param {String} localeCode
   * @param {Object} [data]
   * @param {Object} [options]
   * @returns {DataStore}
   */
  create (localeCode, data, options) {
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
  init (fn) {
    for (const localeCode in locales) {
      const locale = locales[localeCode];

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
  get (localeCode) {
    return locales[localeCode];
  },

  /**
   * Destroy all instances
   */
  destroy () {
    for (const localeCode in locales) {
      locales[localeCode].destroy();
    }
    locales = {};
  }
};