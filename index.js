//require('setimmediate'); //cross-platform compatible (node + browser) - https://github.com/YuzuJS/process.nextTick

// TODO: https://github.com/npm/nopt
// TODO: https://github.com/nodejs/node-v0.x-archive/issues/8648

function IdempotentJSON() {
}

IdempotentJSON.prototype.parse = function (obj) {

    return Promise.resolve(obj).then(function (obj) {
        if (typeof obj !== 'string') {
            //warning: looks like you have called ijson.parse on an object that was already parsed
            return _resolve(obj);
        }
        else {
            var ret = JSON.parse(obj);
            if (typeof ret === 'object' && ('#stringified' in ret)) {
                if(Object.keys(ret) > 1){
                    console.error('Warning: object had more than 1 key, including #stringified key.');
                }
                ret = ret['#stringified'];
            }
            return _resolve(ret);
        }
    }).catch(function (err) {
        return _reject(err);
    });
};

IdempotentJSON.prototype.stringify = function (obj) {

    return Promise.resolve(obj).then(function (obj) {

        if (typeof obj === 'string') {
            if (obj.indexOf('{"#stringified"') === 0) {
                return _resolve(obj);
            }
        }

        if (typeof obj === 'object' && Object.keys(obj).length === 1 && ('#stringified' in obj)) {
            console.error('warning: object you wish to stringify with IJSON already has a top-level "#stringified" property.');
        }

        return _resolve(JSON.stringify({'#stringified': obj}));

    }).catch(function (err) {
        return _reject(err);
    });

};

function _resolve(val) {

    return new Promise(function (resolve) {
        process.nextTick(function () {
            resolve(val);
        });
    });

}

function _reject(err) {

    return new Promise(function (resolve, reject) {
        process.nextTick(function () {
            reject(err);
        });
    });

}


module.exports = new IdempotentJSON();
