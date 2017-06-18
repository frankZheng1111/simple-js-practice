'use strict';
module.exports = function(options){
  let pattern = { module: 'demo', action: 'greeting' };
  let action = function (msg, done) {
    done(null, { answer: 'hello, ' + msg.name });
  }
  this.add(pattern, action);

  return 'greeting';
}
