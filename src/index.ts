'use strict';

const util = require('util');

const log = {
  info: console.log.bind(console, ' [siamese lib] '),
  error: console.error.bind(console, ' [siamese lib] ')
};

const customStringify = function (v: any) : string {
  let cache = new Map();
  return JSON.stringify(v, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.get(value)) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.set(value, true);
    }
    return value;
  });
};

export const parse = function (obj: Promise<string> | string) {
  
  return Promise.resolve(obj).then(function (obj) {
    
    if (typeof obj !== 'string') {
      log.error('warning: looks like you have called ijson.parse on an object that was already parsed => ' + util.inspect(obj));
      return obj;
    }
    
    let ret = JSON.parse(obj);
    if (ret && typeof ret === 'object' && ('#stringified' in ret)) {
      if (Object.keys(ret).length > 1) {
        log.error('Warning: object had more than 1 key, including #stringified key.');
      }
      ret = ret['#stringified'];
    }
    return ret;
    
  });
};

export const stringify = function (obj: Promise<Object> | Object) {
  
  return Promise.resolve(obj).then(function (obj) {
    
    if (typeof obj === 'string') {
      if (String(obj).indexOf('{"#stringified"') === 0) {
        return obj;
      }
    }
    
    if (obj && typeof obj === 'object' && Object.keys(obj).length === 1 && ('#stringified' in obj)) {
      log.error('warning: object you wish to stringify using the siamese library already has a top-level "#stringified" property.');
      return customStringify(obj);
    }
    
    return customStringify({'#stringified': obj});
    
  });
  
};

