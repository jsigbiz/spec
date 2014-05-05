var builtinTypes = require('./parser/builtin-types.js')

module.exports = {
    program: program,
    typeDeclaration: typeDeclaration,
    object: object,
    union: union,
    literal: literal,
    keyValue: keyValue,
    value: value,
    functionType: functionType
}

function program(statements) {
    return {
        type: 'program',
        statements: statements
    }
}

function typeDeclaration(identifier, typeExpression) {
    return {
        type: 'typeDeclaration',
        identifier: identifier,
        typeExpression: typeExpression
    }
}

function object(keyValues) {
    if (!Array.isArray(keyValues)) {
        keyValues = Object.keys(keyValues)
            .reduce(function (acc, key) {
                acc.push(keyValue(key, keyValues[key]))
                return acc
            }, [])
    }

    return {
        type: 'object',
        keyValues: keyValues
    }
}

function union(unions) {
    return {
        type: 'unionType',
        unions: unions
    }
}

function literal(name, builtin, label) {
    if (typeof builtin === 'string') {
        label = builtin
        builtin = undefined
    }

    return {
        type: 'typeLiteral',
        name: name,
        builtin: builtin !== undefined ? builtin :
            builtinTypes.indexOf(name) !== -1 ? true : false,
        label: label || null
    }
}

function keyValue(key, value) {
    return {
        type: 'keyValue',
        key: key,
        value: value
    }
}

function value(_value, name, label) {
    return {
        type: 'valueLiteral',
        value: _value,
        name: name ? name : _value === 'null' ? 'null' : 'void',
        label: label || null
    }
}

function functionType(args, result, thisArg) {
    if (!Array.isArray(args)) {
        thisArg = result
        result = args
        args = []
    }

    return {
        type: 'function',
        args: args,
        result: result,
        thisArg: thisArg || null
    }
}
