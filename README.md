[![NPM Version](https://img.shields.io/npm/v/@yr/data-store-handlers.svg?style=flat)](https://npmjs.org/package/@yr/data-store-handlers)
[![Build Status](https://img.shields.io/travis/YR/data-store-handlers.svg?style=flat)](https://travis-ci.org/YR/data-store-handlers?branch=master)

A collection of generic handlers for use with [@yr/data-store](https://github.com/YR/data-store)

#### `fetchWithTemplatedURL(match: RegExp, urlTemplate: String, options: Object): Array`
A `DataStore.fetch()` handler for working with templated url strings:

```js
const { fetchWithTemplatedURL } = require('@yr/data-store-handlers');
const store = require('@yr/data-store').create('foo', {}, { isFetchable: true });

store.registerMethodHandler(fetchWithTemplatedURL(/foo/, 'http://localhost/{page}'));
store
  .fetch('foo', { page: 'foo' })
  .then((result) => {
    // handle result  
  })
```

#### `resetFromStorage(namespace: String, storage: Object, upgradeStorageData: Function): Array`
A reset handler for bootstrapping data from storage ([@yr/local-storage](https://github.com/YR/local-storage)). 

Handles `DataStore.reset()` method to load data from storage on initialization, setting all storage keys that start with `namespace`. Calls `upgradeStorageData(storageData: Object)` with outdated storage data (based on schema version):

```js
const { resetFromStorage } = require('@yr/data-store-handlers');
const storage = require('@yr/local-storage');

storage.init({ version: { foo: 1 }, writeDelay: 0 });
storage.set('foo/bar', { boo: 'bat' });
// Update schema version
storage.init({ version: { foo: 2 }, writeDelay: 0 });

const store = createStore('foo', {}, { 
  handlers: resetFromStorage('foo', storage, (data) => { 'foo/bar': foo' }) 
});

store.get('foo'); //=> { bar: 'foo' }
storage.get('foo'); //=> { bar: 'foo' }
```