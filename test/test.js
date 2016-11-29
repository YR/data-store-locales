'use strict';

const expect = require('expect.js');
const loader = require('../src/loader-server');
const locales = require('../src/index');
const path = require('path');

describe('data-store-locales', function () {
  afterEach(function () {
    locales.destroy();
  });

  describe('create', function () {
    it('should create and store a locale dataStore instance', function () {
      locales.create('en');
      expect(locales.get('en')).to.have.property('get');
    });
  });

  describe('init', function () {
    beforeEach(function () {
      locales.create('en', { foo: 'foo' });
      locales.create('nb', { foo: 'føø' });
    });

    it('should initialise created locales', function () {
      locales.init(function (locale) {
        const localeCode = locale.get('code');

        locale.set('bar', localeCode == 'en' ? 'bar' : 'bår');
      });
      expect(locales.get('en').get('bar')).to.equal('bar');
      expect(locales.get('nb').get('bar')).to.equal('bår');
    });
    it('should ensure locales are non-writeable', function () {
      locales.init();
      locales.get('en').set('foo', 'bar');
      expect(locales.get('en').get('foo')).to.equal('foo');
    });
  });

  describe('loader', function () {
    beforeEach(function () {
      loader(path.resolve(__dirname, './fixtures'), ['en', 'nb']);
    });

    it('should load an "en" locale', function () {
      expect(locales.get('en').get('foo')).to.have.property('foo', 'foo');
    });
    it('should load an "nb" locale', function () {
      expect(locales.get('nb').get('foo')).to.have.property('foo', 'føø');
    });
    it('should load an "en" locale with time data', function () {
      expect(locales.get('en').get('time')).to.have.property('today', 'Today');
    });
  });
});