'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var util = require('util');
var log = {
    info: console.log.bind(console, ' [siamese lib] '),
    error: console.error.bind(console, ' [siamese lib] ')
};
var customStringify = function (v) {
    var cache = new Map();
    return JSON.stringify(v, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.get(value)) {
                return;
            }
            cache.set(value, true);
        }
        return value;
    });
};
exports.parse = function (obj) {
    return Promise.resolve(obj).then(function (obj) {
        if (typeof obj !== 'string') {
            log.error('warning: looks like you have called ijson.parse on an object that was already parsed => ' + util.inspect(obj));
            return obj;
        }
        var ret = JSON.parse(obj);
        if (ret && typeof ret === 'object' && ('#stringified' in ret)) {
            if (Object.keys(ret).length > 1) {
                log.error('Warning: object had more than 1 key, including #stringified key.');
            }
            ret = ret['#stringified'];
        }
        return ret;
    });
};
exports.stringify = function (obj) {
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
        return customStringify({ '#stringified': obj });
    });
};
