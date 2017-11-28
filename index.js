"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log = {
    info: console.log.bind(console, ' [siamese lib] '),
    error: console.error.bind(console, ' [siamese lib] ')
};
var customStringify = function (v) {
    var cache = [];
    return JSON.stringify(v, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                return;
            }
            cache.push(value);
        }
        return value;
    });
};
exports.parse = function (obj) {
    return Promise.resolve(obj).then(function (obj) {
        if (typeof obj !== 'string') {
            return obj;
        }
        var ret = JSON.parse(obj);
        if (typeof ret === 'object' && ('#stringified' in ret)) {
            if (Object.keys(ret).length > 1) {
                console.error('Warning: object had more than 1 key, including #stringified key.');
            }
            ret = ret['#stringified'];
        }
        return ret;
    });
};
exports.stringify = function (obj) {
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
