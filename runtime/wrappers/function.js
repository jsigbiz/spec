var TypedError = require('error/typed')
var format = require('util').format

var checkValue = require('../checkers/value.js')

var ExpectedFunction = TypedError({
    type: 'expected.function',
    message: 'expected {identifier} to be a function.\n' +
        'instead got type {typeof}.\n' +
        'value is {value}.\n'
})

module.exports = wrapFunction

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
