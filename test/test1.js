

const suman = require('suman');
const Test = suman.init(module);

Test.create('test', function (assert) {

  const ijson = require('..');

  this.it('reacts',t => {
    return ijson.parse(5).then(ijson.stringify).then(ijson.stringify).then(ijson.stringify(5)).then(function (val) {
      console.log(typeof val);
    });
  });

  this.it('test numbers',t => {
    return ijson.parse(ijson.stringify(ijson.stringify(ijson.stringify(5)))).then(function (val) {
      assert(typeof val === 'number', ' val was not a number.');
    });
  });

});

