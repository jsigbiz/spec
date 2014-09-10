'use strict';

var TypedError = require('error/typed');

var ExpectedString = TypedError({
    type: 'expected.string',
    message: 'expected {description} to be a string.\n' +
        'instead got type {typeof}.\n' +
        'value is {value}.\n'
});

var ExpectedNumber = TypedError({
    type: 'expected.number',
    message: 'expected {description} to be a number.\n' +
        'instead got type {typeof}.\n' +
        'value is {value}.\n'
});

var ExpectedError = TypedError({
    type: 'expected.error',
    message: 'expected {description} to be an error.\n' +
        'instead got type {typeof}.\n' +
        'value is {value}.\n'
});

module.exports = checkTypeLiteral;

function checkTypeLiteral(expr, value, description) {
    if (!expr.builtin) {
        console.warn('skipping check', expr);
        return;
    }

    var name = expr.name;

    if (name === 'String') {
        if (typeof value !== 'string') {
            throw ExpectedString({
                typeof: typeof value,
                value: value,
                description: description
            });
        }
    } else if (name === 'Number') {
        if (typeof value !== 'number') {
            throw ExpectedNumber({
                typeof: typeof value,
                value: value,
                description: description
            });
        }
    } else if (name === 'Error') {
        if (!isError(value)) {
            throw ExpectedError({
                typeof: typeof value,
                value: value,
                description: description
            });
        }
    } else {
        console.warn('skipping check', expr);
    }
}

function isError(e) {
    return Object.prototype.toString.call(e) ===
        '[object Error]';
}
