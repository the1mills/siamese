// in the beginning

const Siamese = {};

Siamese.parse = function (obj) {

  return Promise.resolve(obj).then(function (obj) {
    if (typeof obj !== 'string') {
      //warning: looks like you have called ijson.parse on an object that was already parsed
      return obj;
    }
    else {
      var ret = JSON.parse(obj);
      if (typeof ret === 'object' && ('#stringified' in ret)) {
        if (Object.keys(ret).length > 1) {
          console.error('Warning: object had more than 1 key, including #stringified key.');
        }
        ret = ret[ '#stringified' ];
      }
      return ret;
    }
  });
};

Siamese.stringify = function (obj) {

  return Promise.resolve(obj).then(function (obj) {

    if (typeof obj === 'string') {
      if (obj.indexOf('{"#stringified"') === 0) {
        return obj;
      }
    }

    if (typeof obj === 'object' && Object.keys(obj).length === 1 && ('#stringified' in obj)) {
      console.error('warning: object you wish to stringify with IJSON already has a top-level "#stringified" property.');
    }

    return JSON.stringify({ '#stringified': obj });

  });

};

module.exports = Siamese;
