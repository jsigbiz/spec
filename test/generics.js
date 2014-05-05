var test = require('tape');

var parse = require('../parser.js');

test.skip('foo := Object<String, Any>', function (assert) {
    var content = 'foo := Object<String, Any>'
    var result = parse(content).statements[0]

    console.log('result', result)

    assert.end()
});
