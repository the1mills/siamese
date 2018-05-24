

const p = Promise.resolve(5);


p.then(function(){

  p.then(function () {
    console.log('bbb');
  });

  console.log('aaa');

});



