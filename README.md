[![Build Status](https://img.shields.io/travis/nrkno/yr-data-store-locales.svg?style=flat)](https://travis-ci.org/nrkno/yr-data-store-locales?branch=master)

An [@nrk/yr-data-store](https://github.com/nrkno/yr-data-store) factory for managing locales.

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