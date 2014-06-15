var test = require('tape')
var path = require('path')

var compile = require('../../bin/compile.js')

test('compile simple-runtime', function (assert) {
    var file = path.join(__dirname, '..',
        'fixtures', 'simple-runtime', 'good-example-1.js')

    compile({
        _: [file]
    }, function (err) {
        assert.ifError(err)

        assert.end()
    })
})
