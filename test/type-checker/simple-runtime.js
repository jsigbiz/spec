var test = require('tape')
var path = require('path')

var compile = require('../../bin/type-check.js')

test('compile good example 1', function (assert) {
    var file = path.join(__dirname, '..',
        'fixtures', 'simple-runtime', 'good-example-1.js')

    compile({
        _: [file]
    }, function (err, meta) {
        assert.ifError(err)

        assert.ok(meta)

        assert.ok(meta && meta.identifiers.require)
        assert.ok(meta && meta.identifiers.sum)

        assert.end()
    })
})

test('compile bad example 1', function (assert) {
    var file = path.join(__dirname, '..',
        'fixtures', 'simple-runtime', 'bad-example-1.js')

    compile({
        _: [file]
    }, function (err, meta) {
        assert.ok(err)

        assert.equal(err.message, 'expected string got Number')

        assert.end()
    })
})

test('compile bad example 1', function (assert) {
    var file = path.join(__dirname, '..',
        'fixtures', 'simple-runtime', 'bad-example-2.js')

    compile({
        _: [file]
    }, function (err, meta) {
        assert.ok(err)

        assert.equal(err.message, 'expected string got Number')

        assert.end()
    })
})
