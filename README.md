

# Siamese = Idempotent JSON + Promisification


## Installation

```bash
 $ npm install siamese -S
```

# Purpose

1. <b>Prevent yak shaving</b> - stop <i>worrying</i> about whether what your parsing is already parsed.
2. <b>Avoid try/catch</b> - we have promisified JSON.parse()/JSON.stringify - so no more try/catch needed. 


## Basic usage

```js 
const siam = require('siamese');  // you have the choice whether it's global or not
import * as siam from 'siamese';

```

This library provides two primary features that I believe are unfortunately missing from the JSON spec

1 => Idempotence =>

* If you parse something twice, it shouldn't throw an error, it should just return what you gave it
* If you stringify something twice, or thrice, etc, it shouldn't keep stringifying, and accumulating endless escape characters in the process

2 => Error handling and flow control with ES6 Promises =>

* Promises do synchronous error-handling out-of-the-box (just don't forget the rejection handler or catch block)
* We can pass promises to siam.parse() and siam.stringify() and it can parse/stringify the resolution of the promise


## Usage

```js

 // won't throw an error, even though we passed it a plain object
 
siam.parse({foo:'bar'}).then(function(val){  
    console.log(val);  // =>  {foo:'bar'}
})
.catch(err => {
     //nope
});


// you can pass it a promise like so:

siam.parse(new Promise((resolve) => resolve({foo:'bar'})))
.then(function(val){

})
.catch(err => {

});


// since siam.parse and siam.stringify return promises you can do this if you really want to

Promise.all([
    siam.parse(x),
    siam.parse(y),
    siam.stringify(z)
])

// and since siam.parse and siam.stringify accept promises as arguments, you can do

siam.parse(siam.stringify(siam.stringify(siam.stringify({foo:'bar'})))).then(function(val){
    console.log(val);
});


// and since these functions are now idempotent, the final result of the above is:


{foo:'bar'}
```

### voilà !


