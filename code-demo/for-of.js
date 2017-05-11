'use strict';
let objectA = { a: 'b', b: 'c', c: 'd' };

// for of 与 for in 区别
//

// for in 获取的是键
//
console.log('for ... in');
for (let key in objectA) { console.log(key); } // a, b, c

// for of 获取的是值
// for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。(貌似不能遍历对象)
//
console.log('');
console.log('for ... of');
for (let value of [ 4, 5, 6 ]) { console.log(value); } // 4, 5, 6
