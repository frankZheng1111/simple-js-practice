'use strict';
let seneca = require('seneca')();
let should = require ('chai').should();

describe('when seneca use the greeting plugin', () => {
  seneca.use('../../greetingsvc.js');
  it('should has plugin "greeting"', () => {
    seneca.hasplugin('greeting').should.be.true;
  });

  it('should answer hellow with my name', function(){
    let req = { module: 'demo', action: 'greeting', name:'Marlin' }
    seneca.act( req, (error, result) => {
      should.not.exist(error);
      should.exist(result);
      result.answer.should.eq('hello, '+req.name);
    });
  })
})
