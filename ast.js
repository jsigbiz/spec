'use strict';

var builtinTypes = require('./parser/builtin-types.js');

module.exports = {
    program: program,
    typeDeclaration: typeDeclaration,
    assignment: assignment,
    importStatement: importStatement,
    object: object,
    union: union,
    intersection: intersection,
    literal: literal,
    keyValue: keyValue,
    value: value,
    functionType: functionType,
    generic: generic,
    tuple: tuple
};

function program(statements) {
    return {
        type: 'program',
        statements: statements
    };
}

function typeDeclaration(identifier, typeExpression, generics) {
    return {
        type: 'typeDeclaration',
        identifier: identifier,
        typeExpression: typeExpression,
        generics: generics || []
    };
}

function assignment(identifier, typeExpression) {
    return {
        type: 'assignment',
        identifier: identifier,
        typeExpression: typeExpression
    };
}

function importStatement(dependency, types) {
    return {
        type: 'import',
        dependency: dependency,
        types: types
    };
}

function object(keyValues, label, opts) {
    opts = opts || {};
    if (!Array.isArray(keyValues)) {
        keyValues = Object.keys(keyValues)
            .reduce(function (acc, key) {
                acc.push(keyValue(key, keyValues[key]));
                return acc;
            }, []);
    }

    return {
        type: 'object',
        keyValues: keyValues,
        label: label || null,
        optional: opts.optional || false
    };
}

function union(unions, label, opts) {
    opts = opts || {};

    return {
        type: 'unionType',
        unions: unions,
        label: label || null,
        optional: opts.optional || false
    };
}

function intersection(intersections, label, opts) {
    opts = opts || {};

    return {
        type: 'intersectionType',
        intersections: intersections,
        label: label || null,
        optional: opts.optional || false
    };
}

function literal(name, builtin, opts) {
    opts = opts || {};
    if (typeof builtin === 'string') {
        opts.label = builtin;
        builtin = undefined;
    }

    return {
        type: 'typeLiteral',
        name: name,
        builtin: builtin !== undefined ? builtin :
            builtinTypes.indexOf(name) !== -1 ? true : false,
        label: opts.label || null,
        optional: opts.optional || false
    };
}

function keyValue(key, value, opts) {
    opts = opts || {};
    return {
        type: 'keyValue',
        key: key,
        value: value,
        optional: opts.optional || false
    };
}

function value(_value, name, label) {
    name = name ? name :
        _value === 'null' ? 'null' :
        _value === 'undefined' ? 'undefined' :
        _value === 'void' ? 'void' : 'unknown';

    return {
        type: 'valueLiteral',
        value: _value,
        name: name,
        label: label || null,
        optional: false
    };
}

function functionType(opts) {
    return {
        type: 'function',
        args: opts.args || [],
        result: opts.result,
        thisArg: opts.thisArg || null,
        label: opts.label || null,
        optional: opts.optional || false
    };
}

function generic(astValue, generics, label) {
    return {
        type: 'genericLiteral',
        value: astValue,
        generics: generics,
        label: label || null,
        optional: false
    };
}

function tuple(values, label, opts) {
    opts = opts || {};
    return {
        type: 'tuple',
        values: values,
        label: label || null,
        optional: opts.optional || false
    };
}
