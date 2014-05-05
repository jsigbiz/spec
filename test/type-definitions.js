var test = require('tape');

var parse = require('../parser.js');

test('type Foo := String', function (assert) {
    var content = 'type Foo := String'
    var result = parse(content).statements[0]

    assert.equal(result.type, 'typeDeclaration')
    assert.equal(result.identifier, 'Foo')
    assert.deepEqual(result.typeExpression, {
        type: 'typeLiteral',
        builtin: true,
        name: 'String',
        label: null
    })

    assert.end()
})
