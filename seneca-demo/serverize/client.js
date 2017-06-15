var seneca = require('seneca')();

// client
seneca.client(7788);

var req = { module: 'demo', action: 'greeting', name:'Marlin' }
seneca.act(req, (error, result) => {
  if (error) { return console.log(error) }
  console.log(result.answer);
});
