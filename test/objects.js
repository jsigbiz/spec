var test = require('tape');

var parse = require('../parser.js');

test('foo := { text: String }', function (assert) {
    var content = 'foo := { text: String }';
    var result = parse(content).statements[0]

    assert.equal(result.type, 'assignment')
    assert.equal(result.identifier, 'foo')
    assert.deepEqual(result.typeExpression, {
        type: 'object',
        keyValues: [{
            type: 'keyValue',
            key: 'text',
            value: {
                type: 'typeLiteral',
                builtin: true,
                label: null,
                name: 'String'
            }
        }]
    })

    assert.end();
})
