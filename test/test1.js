/**
 * Created by Olegzandr on 6/24/16.
 */


const ijson = require('..');

ijson.stringify(5).then(function(val){
	console.log(typeof val);
});

ijson.parse(ijson.stringify(ijson.stringify(ijson.stringify(5)))).then(function (val) {

	console.log('resolved:', val);

}, function (e) {

	console.log('rejected:', e);
});

