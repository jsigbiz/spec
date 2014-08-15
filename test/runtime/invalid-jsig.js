var test = require('tape')

var getModule = require('./lib/get-module.js')
var tryCatch = require('./lib/try-catch.js')

test('invalidJsig throws an error', function (assert) {
    var tuple = tryCatch(function () {
        return getModule('invalid-jsig')
    })

    assert.ok(tuple[0])
    assert.notEqual(tuple[0].message.indexOf('Baz+16'), -1)

    assert.end()
})
