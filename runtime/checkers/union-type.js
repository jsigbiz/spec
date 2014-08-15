var TypedError = require('error/typed')

var tryCatch = require('../../lib/try-catch.js')
var checkValue = require('./value.js')

var ExpectedUnion = TypedError({
    type: 'expected.union',
    message: 'expected {description} to be a union.\n' +
        'expected one of: \n' +
        '{unions}\n' +
        'instead got type {typeof}.\n' +
        'value is {value}.\n'
})

module.exports = checkUnionType

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
