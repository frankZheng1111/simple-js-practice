'use strict'
let seneca = require('seneca')();

// greeting service
let pattern = { module: 'demo', action: 'greeting' };
let action = function (msg, done) {
  done(null, { answer: 'hello, ' + msg.name });
}
seneca.add(pattern, action);
seneca.listen(7788);
