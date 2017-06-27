'use strict'

// cache by cachemanager

let bluebird = require('bluebird');
let cacheManager = require('cache-manager');
let redisStore = require('cache-manager-redis');

let redisCache = cacheManager.caching({
  store: redisStore,
  host: 'localhost', // default value
  port: 6379, // default value
  db: 0,
  ttl: 600,
  compress: true
});

let Cache = bluebird.promisifyAll(redisCache);

Cache.set('foo', 'bar').then((res) => { return Cache.get('foo') }).then((res) => { console.log(res); })

