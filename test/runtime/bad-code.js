var test = require('tape');

var getModule = require('./lib/get-module.js');
var tryCatch = require('./lib/try-catch.js');

test('notAFunction is not a function', function (assert) {
    var tuple = tryCatch(function () {
        getModule('bad-code', 'not-a-function');
    });

    assert.ok(tuple[0]);
    assert.equal(tuple[0].type, 'expected.function')

    assert.end();
})
