var test = require('tape');

var parse = require('../parser.js');

test('type Foo := Bar | Baz', function (assert) {
    var content = 'type Foo := Bar | Baz'
    var result = parse(content).statements[0]

    assert.equal(result.type, 'typeDeclaration')
    assert.equal(result.identifier, 'Foo')
    assert.deepEqual(result.typeExpression, {
        type: 'unionType',
        unions: [{
            type: 'typeLiteral',
            label: null,
            name: 'Bar',
            builtin: false
        }, {
            type: 'typeLiteral',
            label: null,
            name: 'Baz',
            builtin: false
        }]
    })

    assert.end();
})
