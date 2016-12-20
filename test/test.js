'use strict';

const expect = require('expect.js');
const loader = require('../src/lib/loader-server');
const locales = require('../src/index');
const path = require('path');

describe('data-store-locales', function () {
  afterEach(function () {
    locales.destroy();
  });

  describe('add()', function () {
    it('should add a locale dataStore instance', function () {
      locales.add('en');
      expect(locales.get('en')).to.have.property('get');
    });
  });

  describe('finalize()', function () {
    beforeEach(function () {
      locales.add('en', { foo: 'foo' });
      locales.add('nb', { foo: 'føø' });
    });

    it('should finalize created locales', function () {
      locales.finalize(function (locale) {
        const localeCode = locale.get('code');

        locale.set('bar', localeCode == 'en' ? 'bar' : 'bår');
      });
      expect(locales.get('en').get('bar')).to.equal('bar');
      expect(locales.get('nb').get('bar')).to.equal('bår');
    });
    it('should ensure locales are non-writeable', function () {
      locales.finalize();
      locales.get('en').set('foo', 'bar');
      expect(locales.get('en').get('foo')).to.equal('foo');
    });
  });

  describe('load()', function () {
    beforeEach(function () {
      locales.init(['en', 'nb']);
      locales.load(path.resolve(__dirname, './fixtures'));
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