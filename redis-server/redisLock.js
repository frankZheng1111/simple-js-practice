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
  if (expiredAt > new Date()) {
    // 这边可能有问题, 判断后删除不是一个原子级操作
    // 高并发下可能会有误删其他锁的情况
    // 比如说判断时未超时 执行删除操作时已超时并已被其他线程进程获得锁,这样便会误删
    // 网上说可以用lua脚本解决该问题
    // 这边暂时先以设置稍长的超时时间来解决此问题
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
