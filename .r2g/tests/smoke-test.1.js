#!/usr/bin/env node
'use strict';

/*

 READ ME:
 
 => the files in .r2g/tests will be copied to this location:

 $HOME/.r2g/temp/project/tests/*

 => they do not need to be .js files, but they need to have a hashbang,
 so that r2g knows how to run the file.
 
 => the test files in .r2g/tests can load non-test files from .r2g/fixtures.

*/


const assert = require('assert');
const path = require('path');
const cp = require('child_process');
const os = require('os');
const fs = require('fs');
const EE = require('events');

const siamese = require('siamese');

process.on('unhandledRejection', (reason, p) => {
  // note: unless we force process to exit with 1, process may exit with 0 upon an unhandledRejection
  console.error(reason);
  process.exit(1);
});


const to = setTimeout(() => {
  console.error('r2g phase-T test timed out.');
  process.exit(1);
}, 4000);


const v = {};

siamese.parse(v).then(v1 => {
         assert(v === v1);
       })
       .then(v => {
         return siamese.stringify('foo');
       })
       .then(v => {
         assert.deepStrictEqual(v, '{"@stringified":true,"value":"foo"}')
       })
       .then(v => {
         return siamese.stringify('{"@stringified":true,"value":"foo"}');
       })
       .then(v => {
         assert.deepStrictEqual(v, '{"@stringified":true,"value":"foo"}')
       })
       .catch(v => {
         console.error(v);
         process.exit(1);
       })
       .then(v => {
         clearTimeout(to);
         process.exit(0);
       });


