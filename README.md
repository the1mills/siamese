idempotent-json
===============

<br>
<a href="https://nodei.co/npm/idempotent-json/"><img src="https://nodei.co/npm/idempotent-json.png?downloads=true&downloadRank=true&stars=true"></a>
<br>

## Installation

```js
npm install -S idempotent-json
```

## Basic usage

```js 
const ijson = global.ijson = require('idempotent-json');  // you have the choice whether it's global or not

```

This library provides two primary features that I believe are missing from the JSON spec

1 => Idempotence =>

* If you parse something twice, it shouldn't throw an error, it should just return what you gave it
* If you stringify something twice, or thrice, etc, it shouldn't keep stringifying, and accumulating endless escape characters in the process

2 => Error handling and flow control with ES6 Promises =>

* Promises do synchronous error-handling out-of-the-box (just don't forget the rejection handler or catch block)
* We can pass promises to ijson.parse and ijson.stringify and it can parse/stringify the resolution of the promise


## Usage
```js


ijson.parse({foo:'bar'}).then(function(val){   // won't throw an error, even though we passed it a plain object
    console.log(val);  // =>  {foo:'bar'}
}).catch(function(err){
     //nope
});


// you can pass it a promise like so:

ijson.parse(new Promise(function(resolve){
     resolve({foo:'bar'});
}).then(function(val){

}).catch(function(err){

});


// since ijson.parse and ijson.stringify return promises you can do this if you really want to

Promise.all([
    ijson.parse(x),
    ijson.parse(y),
    ijson.stringify(z)
])

// and since ijson.parse and ijson.stringify accept promises as arguments, you can do


ijson.parse(ijson.stringify(ijson.stringify(ijson.stringify({foo:'bar'})))).then(function(val){
    console.log(val);
});


// and since these functions are now idempotent, the final result of the above is:


{foo:'bar'}
```

### voilà !


