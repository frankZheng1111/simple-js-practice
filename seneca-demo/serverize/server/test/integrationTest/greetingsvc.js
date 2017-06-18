'use strict';
let seneca = require('seneca')();
let should = require ('chai').should();

var portused = require('tcp-port-used');

describe('when greeting service is running', () => {
  it('should listen on tcp port 7788', (done) => {
    portused.check(7788).then((used) => {
      used.should.be.true;
      done();
    });
  });

  it('should response hello message with my name', () => {
    seneca.client(7788);
    var req = { module: 'demo', action: 'greeting', name:'Marlin' }
    seneca.act( req, (error, result) => {
      should.not.exist(error);
      should.exist(result);
      result.answer.should.eq('hello, ' + req.name);
    });
  });
});
