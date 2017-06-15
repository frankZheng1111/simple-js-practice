'use strict'
let seneca = require('seneca')()

// 创建服务
// 方式1
//
seneca.add('role:math,cmd:sum', (msg, reply) => {
  reply(null, {answer: (msg.left + msg.right)})
})

// 方式2
//
let pattern = {
  module: 'demo',
  action: 'greeting'
}

let action = function(msg, done) {
  done(null, { answer: `hello, ${msg.name}` })
}
seneca.add(pattern, action)


// 客户端调用
//
// 方式1
//
seneca.act({role: 'math', cmd: 'sum', left: 1, right: 2}, (err, result) => {
  if (err) { return console.error(err) }
  console.log(result)
})

seneca.act({module:'demo', action: 'greeting', name: 'World'}, (err, result) => {
  if (err) { return console.error(err) }
  console.log(result)
})

