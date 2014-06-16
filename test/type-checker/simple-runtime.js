var test = require('tape')
var path = require('path')

var compile = require('../../bin/type-check.js')

test('compile simple-runtime', function (assert) {
    var file = path.join(__dirname, '..',
        'fixtures', 'simple-runtime', 'good-example-1.js')

    compile({
        _: [file]
    }, function (err, meta) {
        assert.ifError(err)

        assert.ok(meta)

        console.log('meta', meta)

        assert.ok(meta.identifiers.require)
        assert.ok(meta.identifiers.sum)

        assert.end()
    })
})
