'use strict';

var test = require('tape');

var getModule = require('./lib/get-module.js');
var tryCatch = require('./lib/try-catch.js');

test('statement of type String', function t(assert) {
    var str = getModule('statements', 'string-statement');

    assert.equal(str, 'foo');

    assert.end();
});

test('statement of type String (bad)', function t(assert) {
    var tuple = tryCatch(function throwIt() {
        getModule('statements', 'string-statement-bad');
    });

    assert.ok(tuple[0]);
    assert.equal(tuple[0].type, 'expected.string');

    assert.end();
});

test('statement of type Error', function t(assert) {
    var err = getModule('statements', 'error-statement');

    assert.equal(err.message, 'foo');

    assert.end();
});

test('statement of type Error (bad)', function t(assert) {
    var tuple = tryCatch(function throwIt() {
        getModule('statements', 'error-statement-bad');
    });

    assert.ok(tuple[0]);
    assert.equal(tuple[0].type, 'expected.error');

    assert.end();
});
