#!/usr/bin/env node
'use strict';

const suman = require('suman');
const Test = suman.init(module);

Test.create('test', function (assert, it) {
  
  const siam = require('siamese');
  
  it('reacts', t => {
    return siam.parse(5)
      .then(siam.stringify)
      .then(siam.stringify)
      .then(siam.stringify)
      .then(siam.stringify)
      .then(function (val) {
        debugger;
         t.assert.equal(typeof val, 'string');
      });
  });
  
  it('test numbers', t => {
    return siam.parse(siam.stringify(siam.stringify(siam.stringify(5)))).then(function (val) {
      assert(typeof val === 'number', ' val was not a number.');
    });
  });
  
});

