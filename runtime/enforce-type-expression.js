var TypedError = require('error/typed')
var console = require('console')
var format = require('util').format

var tryCatch = require('../lib/try-catch.js')

var ExpectedFunction = TypedError({
    type: 'expected.function',
    message: 'expected {identifier} to be a function.\n' +
        'instead got type {typeof}.\n' +
        'value is {value}.\n'
})

var ExpectedString = TypedError({
    type: 'expected.string',
    message: 'expected {description} to be a string.\n' +
        'instead got type {typeof}.\n' +
        'value is {value}.\n'
})

var ExpectedNumber = TypedError({
    type: 'expected.number',
    message: 'expected {description} to be a number.\n' +
        'instead got type {typeof}.\n' +
        'value is {value}.\n'
})

var ExpectedUnion = TypedError({
    type: 'expected.union',
    message: 'expected {description} to be a union.\n' +
        'expected one of: \n' +
        '{unions}\n' +
        'instead got type {typeof}.\n' +
        'value is {value}.\n'
})

module.exports = enforceTypeExpression

function enforceTypeExpression(expr, value, name) {
    if (expr.type === 'function') {
        return wrapFunction(expr, value, name)
    } else {
        console.warn('skipping check', expr)
        return value
    }
}

function wrapFunction(expr, value, name) {
    if (typeof value !== 'function') {
        throw ExpectedFunction({
            identifier: name,
            typeof: typeof value,
            value: value
        })
    }

    var expectedArgs = expr.args
    var expectedResult = expr.result

    return function () {
        var args = [].slice.call(arguments)

        expectedArgs.forEach(function (value, index) {
            var description = format('argument %d of `%s()`',
                index, name)

            checkValue(value, args[index], description)
        })

        var result = value.apply(this, args)


        var description =
            format('return value of %s()', name)
        checkValue(expectedResult, result, description)

        return result
    }
}

function checkValue(expr, value, description) {
    if (expr.type === 'typeLiteral') {
        return checkTypeLiteral(expr, value, description)
    } else if (expr.type === 'unionType') {
        return checkUnionType(expr, value, description)
    } else {
        console.warn('checkValue: skipping check', expr, description)
    }
}

function checkTypeLiteral(expr, value, description) {
    if (!expr.builtin) {
        console.warn('skipping check', expr)
        return
    }

    var name = expr.name

    if (name === 'String') {
        if (typeof value !== 'string') {
            throw ExpectedString({
                typeof: typeof value,
                value: value,
                description: description
            })
        }
    } else if (name === 'Number') {
        if (typeof value !== 'number') {
            throw ExpectedNumber({
                typeof: typeof value,
                value: value,
                description: description
            })
        }
    } else {
        console.warn('skipping check', expr)
    }
}

function checkUnionType(expr, value, description) {
    var tuples = expr.unions.map(function (expr) {
        return tryCatch(function () {
            checkValue(expr, value, description)
        })
    })

    var errors = tuples.map(function (t) {
        return t[0]
    }).filter(Boolean)

    if (errors.length < expr.unions.length) {
        return
    }

    var unions = errors.map(function (err) {
        return err.message.split('\n')[0]
    }).join('\n')

    throw ExpectedUnion({
        typeof: typeof value,
        value: value,
        description: description,
        unions: unions,
        errors: errors
    })
}
