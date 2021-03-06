'use strict';

let redis = require('redis');
let bluebird = require('bluebird');


// let client = redis.createClient(); //creates a new client
let client = redis.createClient(6379, '127.0.0.1');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client.on('error', function (err) {
  console.log('Error ' + err);
});

client.set('string key', 'string val', 'EX', 30);
client.getAsync('string key')
  .then((data) => {
    console.log(data);
  });

client.hmset('hash key', { a: 111, b: 222 });
client.expire('hash key', 30)

client.hgetallAsync('hash key')
  .then((obj) => {
    let c =obj.a + obj.b;
    console.log(c)
  })

