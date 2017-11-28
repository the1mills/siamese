#!/usr/bin/env node
'use strict';

const suman = require('suman');
const Test = suman.init(module);

Test.create('test', function (it) {
  
  const Siam = require('siamese');
  
  const obj0 = {
    "baz": {
      1: 1,
      "2": true,
      "3": {}
    },
    "foo": null
  };
  
  const json_str1 = '{"baz":{"1":1,"2":true,"3":{}},"foo":null}';
  const json_str2 = '{"baz":{"1":1,"2":true,"3":{}},"foo":function(){function horror(){}}}';
  const json_str3 = '{\"baz\":{\"1\":1,\"2\":true,\"3\":{}},\"foo\":function(){function horror(){}}}';
  const res = '{"#stringified":{"baz":{"1":1,"2":true,"3":{}}}}';
  
  it('test 0', t => {
    
    return Siam.parse(obj0).then(function (val) {
      t.assert.deepEqual(val, obj0);
    });
    
  });
  
  it('test 1', t => {
    
    return Siam.parse(Siam.parse(obj0)).then(function (val) {
      t.assert.deepEqual(val, obj0);
    });
    
  });
  
  it('test 2', t => {
    
    return Siam.parse(obj0).then(function (val) {
      return Siam.parse(Siam.parse(Siam.parse(val))).then(function (val) {
        return Siam.parse(Siam.parse(Siam.parse(val))).then(function (val) {
          t.assert.deepEqual(val, obj0);
        });
      });
    });
    
  });
  
  it('test 3', t => {
    
    return Siam.parse(Siam.parse(json_str1)).then(function (val) {
        t.assert.deepEqual(val, obj0);
      });
  });
  
  it('test 4', t => {
    
    return Siam.parse(obj0).then(function (val) {
        return Siam.stringify(Siam.stringify(Siam.parse(val)));
      })
      .then(function (val) {
        t.assert.deepStrictEqual(val, res, 'not deep equal');
      });
    
  });
  
  it('test 5', t => {
    
    return Siam.parse(json_str2).then(function (val) {
        return Siam.stringify(Siam.stringify(Siam.parse(val)));
      })
      .then(function (val) {
        t.assert.deepStrictEqual(val, res, 'not deep equal');
      });
    
  });
  
  it('test 6', t => {
    
    return Siam.stringify(Siam.stringify(Siam.stringify(obj0))).then(function (val) {
        return Siam.parse(val);
      })
      .then(function (val) {
        t.assert.deepStrictEqual(val, obj0, 'not deep equal');
      });
    
  });
  
  it('test 7', t => {
    
    return Siam.stringify(new Promise(function (resolve) {
        resolve({a: 'A'});
      }))
      .then(function (val) {
        return Siam.parse(val);
      })
      .then(function (val) {
        t.assert.deepStrictEqual(val, obj0, 'not deep equal');
      });
    
  });
  
  it('test 8', t => {
    
    return Promise.all([
      
      Siam.stringify({foo: 'bar'}).then(function (val) {
          return Siam.parse(val);
        })
        .then(function (val) {
          t.assert.deepStrictEqual(val, obj0, 'not deep equal');
        })
      
      ,
      
      Siam.stringify(new Promise(function (resolve) {
          resolve({a: 'A'});
        }))
        .then(function (val) {
          return Siam.parse(val);
        })
        .then(function (val) {
          t.assert.deepStrictEqual(val, obj0, 'not deep equal');
        })
      
    ]);
    
  });
  
});
