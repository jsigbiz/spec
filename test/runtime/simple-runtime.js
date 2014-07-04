var test = require('tape')

var getModule = require('./lib/get-module.js')
var tryCatch = require('./lib/try-catch.js')

var simpleRuntime = getModule('simple-runtime')
var extra = getModule('simple-runtime', 'extra')

test('simpleRuntime is a function', function (assert) {
    assert.equal(typeof simpleRuntime, 'function')

    assert.end()
})

test('can call simpleRuntime with two args', function (assert) {
    var res = tryCatch(function () {
        return simpleRuntime('one', 'two')
    })

    assert.ifError(res[0])
    assert.equal(res[1], 'onetwo')
    assert.end()
})

test('missing argument throws', function (assert) {
    var res = tryCatch(function () {
        return simpleRuntime('one')
    })

    assert.ok(res[0])
    assert.equal(res[0].type, 'expected.string')

    assert.end()
})

test('extra file takes string or number', function (assert) {
    var res = tryCatch(function () {
        return extra(42)
    })

    assert.ifError(res[0])
    assert.equal(res[1], 42)

    var res2 = tryCatch(function () {
        return extra('42')
    })

    assert.ifError(res2[0])
    assert.equal(res2[1], '42')

    assert.end()
})

test('extra file throws on invalid argument', function (assert) {
    var res = tryCatch(function () {
        return extra(null)
    })

    assert.ok(res[0])
    assert.equal(res[0].type, 'expected.union')

    assert.end()
})

test('extra throws on invalid return', function (assert) {
    var res = tryCatch(function () {
        return extra(9001)
    })

    assert.ok(res[0])
    assert.equal(res[0].type, 'expected.union')
    assert.notEqual(res[0].message
        .indexOf('return value of '), -1)

    assert.end()
})

test('value file does not throw', function (assert) {
    var res = tryCatch(function () {
        return getModule('simple-runtime', 'value')
    })

    assert.ifError(res[0])
    assert.equal(res[1], 'a string')

    assert.end()
})
