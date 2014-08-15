'use strict';

var test = require('tape');

var parse = require('../../parser.js');

test('foo : Bar & Baz', function t(assert) {
    var content = 'foo : Bar & Baz';
    var result = parse(content).statements[0];

    assert.equal(result.type, 'assignment');
    assert.equal(result.identifier, 'foo');
    assert.deepEqual(result.typeExpression, {
        type: 'intersectionType',
        intersections: [{
            type: 'typeLiteral',
            name: 'Bar',
            builtin: false,
            optional: false,
            label: null
        }, {
            type: 'typeLiteral',
            name: 'Baz',
            builtin: false,
            optional: false,
            label: null
        }],
        label: null,
        optional: false
    });

    assert.end();
});
