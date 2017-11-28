
const log = {
  info: console.log.bind(console, ' [siamese lib] '),
  error: console.error.bind(console, ' [siamese lib] ')
};

const customStringify = function (v: any) {
  let cache: Array<any> = [];
  return JSON.stringify(v, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  });
};


export const parse = function (obj : Promise<any> | string) {

  return Promise.resolve(obj).then(function (obj) {
    
    if (typeof obj !== 'string') {
      //warning: looks like you have called ijson.parse on an object that was already parsed
      return obj;
    }

      let ret = JSON.parse(obj);
      if (typeof ret === 'object' && ('#stringified' in ret)) {
        if (Object.keys(ret).length > 1) {
          console.error('Warning: object had more than 1 key, including #stringified key.');
        }
        ret = ret[ '#stringified' ];
      }
      return ret;
    
  });
};

export const stringify = function (obj: Promise<any> | Object) {

  return Promise.resolve(obj).then(function (obj) {

    if (typeof obj === 'string') {
      if (obj.indexOf('{"#stringified"') === 0) {
        return obj;
      }
    }

    if (typeof obj === 'object' && Object.keys(obj).length === 1 && ('#stringified' in obj)) {
      console.error('warning: object you wish to stringify with IJSON already has a top-level "#stringified" property.');
      return customStringify(obj);
    }

    return customStringify({ '#stringified': obj });

  });

};

