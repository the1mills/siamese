'use strict';

import util = require('util');
import * as safe from '@oresoftware/safe-stringify';

const log = {
  info: console.log.bind(console, 'siamese lib:'),
  error: console.error.bind(console, 'siamese lib:')
};

export const r2gSmokeTest = () => {
  return true;
};

export const parse = (obj: Promise<string> | string) => {
  
  return Promise.resolve(obj).then(o => {
    
    if (typeof o !== 'string') {
      log.error('warning: looks like you have called JSON.parse on an object that was already parsed => ' + util.inspect(o));
      return o;
    }
    
    let ret = JSON.parse(o);
    
    if (ret && ret['@stringified'] === true) {
      ret = ret['value'];
    }
    
    return ret;
    
  });
};


export const stringify = (obj: any) => {
  
  return Promise.resolve(obj).then(o => {
    
    if (typeof o === 'string') {
      if (String(o).indexOf('{"@stringified"') === 0) {
        return o;
      }
    }
    
    if (o && o['@stringified'] === true && ('value' in o)) {
      
      if (o.value === undefined) {
        o.value = null;
      }
      
      log.error('warning: object you wish to stringify using the siamese library already has a top-level "@stringified" property.');
      return safe.stringify(o);
    }
    
    return safe.stringify({'@stringified': true, 'value': o});
    
  });
  
};

