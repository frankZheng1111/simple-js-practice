'use strict';
function arrow () {
  this.a1 = 2;
  this.a2 = 3;
  setImmediate(() => {
    console.log(`a1: ${this.a1}`);
  });
  setImmediate(function() {
    console.log(`a2: ${this.a2}`);
  });
}

// a1: 2
// a2: undefined
//
new arrow();
