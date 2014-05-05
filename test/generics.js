var test = require('tape');

var parse = require('../parser.js');

test('foo := Object<String, Any>', function (assert) {
    var content = 'foo := Object<String, Any>'
    var result = parse(content).statements[0]

    assert.equal(result.type, 'assignment')
    assert.equal(result.identifier, 'foo')
    assert.deepEqual(result.typeExpression, {
        type: 'genericLiteral',
        value: {
            type: 'typeLiteral',
            builtin: true,
            name: 'Object'
        },
        generics: [{
            type: 'typeLiteral',
            builtin: true,
            name: 'String',
            label: null
        }, {
            type: 'typeLiteral',
            builtin: true,
            name: 'Any',
            label: null
        }],
        label: null
    })

    assert.end()
});
