[![NPM Version](https://img.shields.io/npm/v/@yr/data-store-locales.svg?style=flat)](https://npmjs.org/package/@yr/data-store-locales)
[![Build Status](https://img.shields.io/travis/YR/data-store-locales.svg?style=flat)](https://travis-ci.org/YR/data-store-locales?branch=master)

An [@yr/data-store](https://github.com/YR/data-store) factory for managing locales.

#### `create(localeCode: String, [data: Object], [options: Object]): DataStore`
Create new locale for `localeCode`

#### `init(fn: Function)`
Initialise all created locales by passing each to `fn(locale: DataStore, locales: Object)`. Locales will be non-writeable once initialised.

#### `get(localeCode: String): DataStore`
Retrieve locale DataStore for `localeCode`.

#### `destroy()`
Destroy all instances.