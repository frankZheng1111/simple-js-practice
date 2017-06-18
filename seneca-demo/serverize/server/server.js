'use strict';
let seneca = require('seneca')();

let greeting = require('./greetingsvc.js');
seneca.use(greeting);
seneca.listen(7788);
