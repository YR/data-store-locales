[![NPM Version](https://img.shields.io/npm/v/@yr/data-store-locales.svg?style=flat)](https://npmjs.org/package/@yr/data-store-locales)
[![Build Status](https://img.shields.io/travis/YR/data-store-locales.svg?style=flat)](https://travis-ci.org/YR/data-store-locales?branch=master)

An [@yr/data-store](https://github.com/YR/data-store) factory for managing locales.

#### `init(localeCodes: Array)`
Configure with valid locale codes.

#### `add(localeCode: String, [data: Object], [options: Object]): DataStore`
Add new locale for `localeCode`.

#### `load(...args)`
Load locale files.

For server environments, the signature is `load(localespath: String)`, where `localespath` is a path to a directory of *.json files.

For browser environments, the signature is `load(data: Object)`, where `data` is locale data for *one* locale.

#### `freeze(data: Object)`
Lock all locales after optionally setting `data`.

#### `get(localeCode: String): DataStore`
Retrieve locale DataStore for `localeCode`.

#### `all(): Object`
Retrieve all locale DataStores keyed by `localeCode`.

#### `destroy()`
Destroy all instances.