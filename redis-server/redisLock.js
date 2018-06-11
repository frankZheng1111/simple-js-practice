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

async function getLock(key, expireTime) {
  let expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + expireTime);
  let reply = await client.setnxAsync(key, expiredAt);
  // 已获得锁
  if (reply) { return expiredAt; }
  let oldTimestamp = new Date(await client.getAsync(key));
  // 未过期，未获得锁;
  if (new Date() <= oldTimestamp) { return false; }
  let newExpiredAt = new Date();
  newExpiredAt.setSeconds(expiredAt.getSeconds() + expireTime);
  oldTimestamp = new Date(await client.getsetAsync(key, newExpiredAt));
  if (oldTimestamp < new Date) { return newExpiredAt; }
  return false;
};

async function unLock(key, expiredAt) {
  // 未过期, 释放锁
  // 这边可能有问题，判断和删除操作不是原子级的操作
  if (expiredAt > new Date()) {
    return await client.delAsync(key);
  }
};

async function main() {
  let time1 = await getLock('test', 10);
  console.log('should get');
  console.log(time1);// time
  let time2 = await getLock('test', 10);
  console.log('should fail');
  console.log(time2); // false
  await unLock('test');
  let time3 = await getLock('test', 1);
  console.log('should get');
  console.log(time3) // time
  setTimeout(async () => {
    let time4 = await getLock('test', 1);
    console.log('should get');
    console.log(time4); // time
    await unLock('test');
  }, 5000);
}
main();
