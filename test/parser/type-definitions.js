'use strict';

var test = require('tape');

var parse = require('../../parser.js');

test('type Foo : String', function t(assert) {
    var content = 'type Foo : String';
    var result = parse(content).statements[0];

    assert.equal(result.type, 'typeDeclaration');
    assert.equal(result.identifier, 'Foo');
    assert.deepEqual(result.typeExpression, {
        type: 'typeLiteral',
        builtin: true,
        name: 'String',
        label: null,
        optional: false
    });

    assert.end();
});

test('type OptionError<T> : { option: T }', function t(assert) {
    var content = 'type OptionError<T> : { option: T }';
    var result = parse(content).statements[0];

    assert.equal(result.type, 'typeDeclaration');
    assert.equal(result.identifier, 'OptionError');
    assert.deepEqual(result.typeExpression, {
        type: 'object',
        keyValues: [{
            type: 'keyValue',
            key: 'option',
            value: {
                type: 'typeLiteral',
                name: 'T',
                builtin: false,
                label: null,
                optional: false
            },
            optional: false
        }],
        label: null,
        optional: false
    });
    assert.deepEqual(result.generics, [{
        type: 'typeLiteral',
        name: 'T',
        builtin: false,
        label: null,
        optional: false
    }]);

    assert.end();
});
