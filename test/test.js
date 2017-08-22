'use strict';

const { expect } = require('chai');
const locales = require('../src/index');
const path = require('path');

describe('data-store-locales', () => {
  afterEach(() => {
    locales.destroy();
  });

  describe('add()', () => {
    it('should add a locale dataStore instance', () => {
      locales.add('en');
      expect(locales.get('en')).to.have.property('get');
    });
  });

  describe('freeze()', () => {
    beforeEach(() => {
      locales.add('en', { code: 'en', foo: 'foo' });
      locales.add('nb', { code: 'nb', foo: 'føø' });
    });

    it('should freeze created locales', () => {
      locales.freeze({
        en: { bar: 'bar' },
        nb: { bar: 'bår' }
      });
      expect(locales.get('en').get('bar')).to.equal('bar');
      expect(locales.get('nb').get('bar')).to.equal('bår');
    });
    it('should ensure locales are non-writeable', () => {
      locales.freeze();
      try {
        locales.get('en').set('foo', 'bar');
        expect(false);
      } catch (err) {
        expect(locales.get('en').get('foo')).to.equal('foo');
      }
    });
  });

  describe('load()', () => {
    beforeEach(() => {
      locales.init(['en', 'nb']);
      locales.load(path.resolve(__dirname, './fixtures'));
    });

    it('should load an "en" locale', () => {
      expect(locales.get('en').get('foo')).to.have.property('foo', 'foo');
    });
    it('should load an "nb" locale', () => {
      expect(locales.get('nb').get('foo')).to.have.property('foo', 'føø');
    });
    it('should load an "en" locale with time data', () => {
      expect(locales.get('en').get('time')).to.have.property('today', 'Today');
    });
  });
});
