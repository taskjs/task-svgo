'use strict';

var assert = require('assert');
var Svgo = require('../lib/svgo');
var path = require('path');
var fs = require('fs');

var filepath = path.join(__dirname, 'fixtures/foo.svg');

function errorHandler(err){
    process.nextTick(function rethrow() { throw err; });
}

(new Svgo).run(
    [{
        contents: fs.readFileSync(filepath),
        path: filepath
    }], // inputs
    {}, // options
    console // logger
).then(function(inputs){
    var expected = fs.readFileSync(path.join(__dirname, 'expected/foo.svg'));
    assert.equal(inputs[0].contents.toString(), expected.toString())
}).catch(errorHandler)
